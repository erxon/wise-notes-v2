const { ChatGroq } = require("@langchain/groq");
require("dotenv").config();

const groqLLM = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "openai/gpt-oss-120b",
});

module.exports = groqLLM;
