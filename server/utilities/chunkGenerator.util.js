const Chunk = require("../models/chunks.model");
const splitter = require("./textSplitter.util");
const embeddings = require("./embeddings.util");

const chunkGenerator = async (content, noteId, userId) => {
  try {
    const chunks = await splitter.splitText(content);

    await Promise.all(
      chunks.map(async (chunk) => {
        const embeddingVector = await embeddings.embedQuery(chunk);
        const newChunk = new Chunk({
          noteId: noteId,
          userId: userId,
          text: chunk,
          embedding: embeddingVector,
        });

        await newChunk.save();
      })
    );

    return { message: "Chunks generated", success: true };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = chunkGenerator;
