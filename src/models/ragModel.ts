import db from '../config/db.js';

export const storeEmbeddings = async (text: string, embedding: number[] | string): Promise<void> => {
    await db.query(
        "INSERT INTO embeddings (content, embedding) VALUES ($1, $2::vector)",
        [text, embedding]
    );
};
