import { storeDocument, storeChunks } from "../models/documentModel.js";
export const createDocument = async (fileName, path) => {
    const result = await storeDocument(fileName, path);
    return result;
};
export const insertChunks = async (documentId, index, content, embedding) => {
    await storeChunks(documentId, index, content, embedding);
};
//# sourceMappingURL=documentService.js.map