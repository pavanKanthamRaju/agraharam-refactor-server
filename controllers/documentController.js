import {readPdf} from "../services/pdfService.js"
import {chunkText} from "../services/chunkService.js"
import {cleanText} from "../utils/textCleaner.js";
import {createEmbeddingsBatch} from "../utils/gemini.js"
import {createDocument, insertChunks} from "../services/documentService.js"

export const uploadAndProcess = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 1. Save document
    const doc = await createDocument(file.originalname, file.path);

    // 2. Read PDF
    let text = await readPdf(file.path);

    // 3. Clean text
    text = cleanText(text);

    // 4. Chunk
    let chunks = chunkText(text).filter(c => c.length > 50);

    console.log(`Total Chunks: ${chunks.length}`);

    // 5. Batch embeddings (🔥 huge improvement)
    const embeddings = await createEmbeddingsBatch(chunks);

    // 6. Insert chunks
    for (let i = 0; i < chunks.length; i++) {
      await insertChunks(
        doc.id,
        i,
        chunks[i],
        embeddings[i]
      );
    }

    res.json({
      success: true,
      documentId: doc.id,
      chunks: chunks.length,
    });

  } catch (err) {
    console.error("Upload error:", err);
    next(err);
  }
};
