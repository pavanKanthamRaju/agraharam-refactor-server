
import {checkChunks} from "../../models/documentModel.js"
export const searchChunks = async (embeddingArray, limit = 5) => {
  const vector = `[${embeddingArray.join(",")}]`;
const response =  await checkChunks(vector,limit)
return response

};
