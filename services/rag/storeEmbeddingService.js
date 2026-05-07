import pool from "../../config/db.js"
// import {createEmbedding} from "./embedService.js"
import {createEmbedding} from "../../utils/gemini.js"
import {storeEmeddings} from "../../models/ragModel.js"

export const storeEmbedded = async(text)=>{
const embedding = await createEmbedding(text);
const modifiedEmbedding = `[${embedding.join(",")}]`
await storeEmeddings(text,modifiedEmbedding)
};

export const getRelavanceDocs = async(queryEmbeddingVector) =>{
console.log("Relavance Data ")
    const result = await pool.query(
        `SELECT content,
        embedding <=> $1::vector AS distance
        FROM embeddings
        ORDER BY distance ASC
        LIMIT 5
        ` ,[queryEmbeddingVector]
    )

    return result.rows;

}
