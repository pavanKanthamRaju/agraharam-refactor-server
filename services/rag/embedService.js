import openai from "../../utils/openai.js"

export const createEmbedding = async(text) =>{
try{


        const response  = await openai.embeddings.create({
            model : "text-embedding-3-small",
            input: text
        })
console.log("embeeding response is", response)
        return response.data[0].embedding;
}
catch(err){
    console.error("❌ FULL ERROR:", err); // VERY IMPORTANT
    console.error("❌ MESSAGE:", err.message);
    console.error("❌ STATUS:", err.status);
throw err
}
}
