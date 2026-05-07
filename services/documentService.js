import {storeDocument, storeChunks} from "../models/documentModel.js"

export const createDocument = (fileName,path)=>{
const result =storeDocument(fileName, path)
return result
}

export const insertChunks = (documentId,index,content,embedding) => {
    storeChunks(documentId,index,content,embedding);
}
