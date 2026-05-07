export const chunkText = (text) => {
  const chunks = [];
  const MAX = 500;
  const OVERLAP = 100;

  let start = 0;

  while (start < text.length) {
    let end = start + MAX;

    // Fix END boundary
    if (end < text.length) {
      const lastSpace = text.lastIndexOf(" ", end);
      if (lastSpace > start) end = lastSpace;
    }

    // Fix START boundary
    if (start !== 0) {
      const nextSpace = text.indexOf(" ", start);
      if (nextSpace !== -1 && nextSpace < end) {
        start = nextSpace + 1;
      }
    }

    const chunk = text.slice(start, end).trim();

    if (chunk.length > 50) {
      chunks.push(chunk);
    }

    start = end - OVERLAP;
    if (start < 0) start = 0;
  }

  return chunks;
};
