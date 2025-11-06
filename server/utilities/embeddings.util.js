const {
  HuggingFaceInferenceEmbeddings,
} = require("@langchain/community/embeddings/hf");
require("dotenv").config();

const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGINGFACE_API_KEY,
  model: "BAAI/bge-small-en-v1.5",
  endpointUrl: "https://router.huggingface.co/hf-inference/models/BAAI/bge-small-en-v1.5/pipeline/feature-extraction",
});

module.exports = embeddings;
