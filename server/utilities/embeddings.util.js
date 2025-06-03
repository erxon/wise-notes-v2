const {
  HuggingFaceInferenceEmbeddings,
} = require("@langchain/community/embeddings/hf");
require("dotenv").config();

const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGINGFACE_API_KEY,
  model: "BAAI/bge-small-en-v1.5",
});

module.exports = embeddings;
