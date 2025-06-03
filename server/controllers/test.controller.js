const logger = require("../utilities/logger.util");
const getEmbeddings = require("../utilities/note-embedder");

const createNoteWithEmbeddings = async (req, res) => {
  try {
    const { title, content } = req.body;

    const text = `${title}\n\n${content}`;
    const embeddings = await getEmbeddings(text);

    console.log(embeddings);
    logger.info("Embeddings created successfully");

    res.status(200).json({ embeddings });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = createNoteWithEmbeddings;
