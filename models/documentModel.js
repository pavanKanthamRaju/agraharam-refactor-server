import pool from "../config/db.js"

export const storeDocument = async(fileName,path)=>{
    const result = await pool.query(
            `INSERT INTO documents (file_name, path)
            VALUES($1,$2)
            RETURNING *`,
            [fileName, path]

    )
    return result.rows[0];
}
export const storeChunks = async(documentId,index,content,embedding)=>{
    const vector = `[${embedding.join(",")}]`
await pool.query(
    `INSERT INTO document_chunks
    (document_id, chunk_index, content,embedding)
    VALUES($1,$2,$3,$4)
    `,
    [documentId,index,content,vector]
)
}

export const checkChunks = async(vector, limit)=>{
    const result = await pool.query(
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
}
