import { checkChunks } from "../../models/documentModel.js";

export const searchChunks = async (embeddingArray: number[], limit: number = 5) => {
    const vector = `[${embeddingArray.join(",")}]`;
    const response = await checkChunks(embeddingArray, limit);
    return response;
};
