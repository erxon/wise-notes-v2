const { MongoDBAtlasVectorSearch } = require("@langchain/mongodb");
const mongoose = require("mongoose");
const embeddings = require("./embeddings.util");
const Note = require("../models/notes.model");
const Chunk = require("../models/chunks.model");

const getVectorStore = async () => {
  const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
    collection: Chunk.collection,
    indexName: "notesChunks",
    textKey: "text",
    embeddingKey: "embedding",
  });

  return vectorStore;
};

module.exports = getVectorStore;
