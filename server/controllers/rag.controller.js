const getVectorStore = require("../utilities/vectorStore.util");
const groqLLM = require("../utilities/groqllm.util");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { RunnablePassthrough } = require("@langchain/core/runnables");
const logger = require("../utilities/logger.util");
const { ObjectId } = require("mongodb");
const Chat = require("../models/chats.model");
const User = require("../models/user.model");

const query = async (req, res) => {
  const { query } = req.body;

  const user = await User.findById(req.user.id);
  const userId = ObjectId.createFromHexString(req.user.id);

  try {
    const vectorStore = await getVectorStore();
    const retriever = vectorStore.asRetriever({
      filter: { userId: userId, deletedAt: null },
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are an AI assistant for answering questions based 
            on the provided context from my personal notes. Answer the question thruthfully and concisely
            based *only* on the context provided. If the answer is not in the context, state
            that you don't have enough information. Do not make up answers. Please add structure the notes accordingly, and highlight important terms.
            Context: {context}`,
      ],
      ["human", "{question}"],
    ]);

    const chain = RunnablePassthrough.assign({
      context: async (input) => {
        const relevantDocs = await retriever.invoke(input.question);
        return relevantDocs.map((doc) => doc.pageContent).join("\n");
      },
      question: new RunnablePassthrough(),
    })
      .pipe(prompt)
      .pipe(groqLLM)
      .pipe(new StringOutputParser());

    const response = await chain.invoke({ question: query });
    
    user.usageLimit.chat = user.usageLimit.chat + 1;
    await user.save();

    const newChat = new Chat({
      userId: userId,
      query: query,
      answer: response,
      createdAt: Date.now(),
    });

    const savedChat = await newChat.save();

    res.json({ answer: response, data: savedChat });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = { query };
