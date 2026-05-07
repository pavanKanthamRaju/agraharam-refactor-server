import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

// Fix for different export shapes
const pdf = pdfParse.default || pdfParse;
console.log("this is pdf",pdf);
export const readPdf = async (filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);

    const data = await pdf(buffer);

    return data.text;
  } catch (err) {
    console.log("PDF Error is:", err);
    throw err;
  }
};
