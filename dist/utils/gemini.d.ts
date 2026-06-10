import 'dotenv/config';
export declare const askGemini: (prompt: string) => Promise<string>;
export declare const createEmbedding: (text: string) => Promise<number[]>;
export declare const createEmbeddingsBatch: (chunks: string[]) => Promise<number[][]>;
//# sourceMappingURL=gemini.d.ts.map