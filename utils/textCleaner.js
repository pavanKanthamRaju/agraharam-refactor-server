export const cleanText = (text) => {
  if (!text) return "";

  return text
    // 1. Normalize all line breaks
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")

    // 2. Fix hyphenated words split across lines
    // e.g. "spiri-\ntual" → "spiritual"
    .replace(/-\n/g, "")

    // 3. Convert single line breaks to space
    // (PDFs often break lines randomly)
    .replace(/\n+/g, " ")

    // 4. Preserve numbered sections by adding line break
    // "1. Title 2. Title" → new lines
    .replace(/(\d+)\.\s+/g, "\n$1. ")

    // 5. Normalize bullets
    .replace(/[•●▪]/g, " • ")

    // 6. Fix spacing around punctuation
    .replace(/\s+([.,!?])/g, "$1")

    // 7. Ensure space after punctuation
    .replace(/([.,!?])([A-Za-z])/g, "$1 $2")

    // 8. Fix merged words cautiously (VERY IMPORTANT)
    // "web-basedplatform" → "web-based platform"
    .replace(/([a-z])([A-Z])/g, "$1 $2")

    // 9. Remove extra spaces
    .replace(/\s{2,}/g, " ")

    // 10. Trim
    .trim();
};
