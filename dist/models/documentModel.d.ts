export declare const storeDocument: (fileName: string, path: string) => Promise<any>;
export declare const storeChunks: (documentId: string, index: number, content: string, embedding: number[]) => Promise<void>;
export declare const checkChunks: (vector: number[], limit: number) => Promise<any[]>;
//# sourceMappingURL=documentModel.d.ts.map