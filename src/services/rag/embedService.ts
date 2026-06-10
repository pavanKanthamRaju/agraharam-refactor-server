import openai from "../../utils/openai.js";

export const createEmbedding = async (text: string): Promise<number[]> => {
    try {
        const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: text
        });
        console.log("embedding response is", response);
        return response.data[0].embedding;
    } catch (err: any) {
        console.error("❌ FULL ERROR:", err);
        console.error("❌ MESSAGE:", err.message);
        console.error("❌ STATUS:", err.status);
        throw err;
    }
};
