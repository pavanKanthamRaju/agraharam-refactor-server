import { storeDocument, storeChunks } from "../models/documentModel.js";

export const createDocument = async (fileName: string, path: string) => {
    const result = await storeDocument(fileName, path);
    return result;
};

export const insertChunks = async (documentId: string, index: number, content: string, embedding: number[]) => {
    await storeChunks(documentId, index, content, embedding);
};
