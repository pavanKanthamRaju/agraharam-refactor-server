import db from "../../config/db.js";
import { createEmbedding } from "../../utils/gemini.js";
import { storeEmbeddings } from "../../models/ragModel.js";
export const storeEmbedded = async (text) => {
    const embedding = await createEmbedding(text);
    const modifiedEmbedding = `[${embedding.join(",")}]`;
    await storeEmbeddings(text, modifiedEmbedding);
};
export const getRelevanceDocs = async (queryEmbeddingVector) => {
    console.log("Relevance Data");
    const result = await db.query(`SELECT content,
        embedding <=> $1::vector AS distance
        FROM embeddings
        ORDER BY distance ASC
        LIMIT 5`, [queryEmbeddingVector]);
    return result.rows;
};
//# sourceMappingURL=storeEmbeddingService.js.map