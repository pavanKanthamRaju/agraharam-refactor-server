import pool from "../config/db.js";

export const storeEmeddings = async (text, embedding)=>{

    await pool.query(
    "INSERT INTO embeddings (content, embedding) VALUES ($1, $2::vector)", [text, embedding]

);
}
