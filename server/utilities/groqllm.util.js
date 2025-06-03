const { ChatGroq } = require("@langchain/groq");
require("dotenv").config();

const groqLLM = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "deepseek-r1-distill-llama-70b",
});

module.exports = groqLLM;
