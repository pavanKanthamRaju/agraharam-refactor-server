import db from '../config/db.js';

export const storeDocument = async (fileName: string, path: string) => {
    const result = await db.query(
        `INSERT INTO documents (file_name, path)
        VALUES($1,$2)
        RETURNING *`,
        [fileName, path]
    );
    return result.rows[0];
};

export const storeChunks = async (
    documentId: string,
    index: number,
    content: string,
    embedding: number[]
) => {
    const vector = `[${embedding.join(",")}]`;
    await db.query(
        `INSERT INTO document_chunks
        (document_id, chunk_index, content, embedding)
        VALUES($1,$2,$3,$4)`,
        [documentId, index, content, vector]
    );
};

export const checkChunks = async (vector: number[], limit: number) => {
    const result = await db.query(
        `
        SELECT content,
               1 - (embedding <=> $1::vector) AS similarity
        FROM document_chunks
        ORDER BY embedding <=> $1::vector
        LIMIT $2
        `,
        [vector, limit]
    );
    return result.rows;
};
