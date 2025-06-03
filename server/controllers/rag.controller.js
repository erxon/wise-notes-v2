const getVectorStore = require("../utilities/vectorStore.util");
const groqLLM = require("../utilities/groqllm.util");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { RunnablePassthrough } = require("@langchain/core/runnables");
const logger = require("../utilities/logger.util");
const { ObjectId } = require("mongodb");

const query = async (req, res) => {
  const { query } = req.body;

  const userId = ObjectId.createFromHexString(req.user.id);

  try {
    const vectorStore = await getVectorStore();
    const retriever = vectorStore.asRetriever({
      filter: { userId: userId },
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are an AI assistant for answering questions based 
            on the provided context from my personal notes. Answer the question thruthfully and concisely
            based *only* on the context provided. If the answer is not in the context, state
            that you don't have enough information. Do not make up answers.
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

    res.json({ answer: response });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = { query };
