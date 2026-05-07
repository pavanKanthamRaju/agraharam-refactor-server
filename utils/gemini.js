import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import pLimit from "p-limit";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

export const askGemini = async(prompt) => {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}


const embeddingModel = genAI.getGenerativeModel({
  model: "gemini-embedding-2",
});

export const createEmbedding = async(text)=> {
  const result = await embeddingModel.embedContent({content: {
        parts: [{ text }],
      },
       outputDimensionality: 768,
});

  console.log("embeddings", result);
  return result.embedding.values; // array of numbers
}




// limit concurrent API calls (VERY IMPORTANT)
const limit = pLimit(5); // you can tune: 3–10

export const createEmbeddingsBatch = async (chunks) => {
  try {
    if (!Array.isArray(chunks) || chunks.length === 0) {
      throw new Error("Invalid chunks input");
    }

    // Wrap each embedding call with concurrency control
    const tasks = chunks.map((chunk) =>
      limit(async () => {
        const embedding = await createEmbedding(chunk);

        if (!Array.isArray(embedding) || embedding.length !== 768) {
          throw new Error("Invalid embedding returned");
        }

        return embedding;
      })
    );

    const results = await Promise.all(tasks);

    return results;

  } catch (err) {
    console.error("Batch embedding error:", err);
    throw err;
  }
};
