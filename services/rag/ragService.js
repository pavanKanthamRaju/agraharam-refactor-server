import openai from "../../utils/openai.js";
// import {createEmbedding} from "./embedService.js";
import {createEmbedding, askGemini} from "../../utils/gemini.js"
import {getRelavanceDocs} from "./storeEmbeddingService.js";
import {searchChunks} from "./searchService.js";

export const askRag = async (question) => {

  const greetings = ["hi", "hello", "hey"];
  const lower = question.toLowerCase().trim();

  if (greetings.includes(lower)) {
    return "Hello! 😊 How can I assist you today?";
  }

  const queryEmbedding = await createEmbedding(question);

  const docs = await searchChunks(queryEmbedding);

  if (!docs.length) {
    return "Sorry, I couldn’t find the information you're looking for in the available data.";
  }

  const context = docs
    .map((d, i) => `Chunk ${i + 1}:\n${d.content}`)
    .join("\n\n");

  const prompt = `
You are a polite and friendly AI assistant.

Your behavior rules:

- Always respond politely and naturally
- Use a conversational tone
- Answer ONLY from the context
- Do NOT hallucinate
- Slightly enhance answers for clarity

If answer not found:
"Sorry, I couldn’t find the information you're looking for in the available data."

Context:
${context}

User Question:
${question}
`;

  const answer = await askGemini(prompt);

  return answer;
};
