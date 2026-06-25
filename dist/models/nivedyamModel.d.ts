import { Nivedyam } from '../types/index.js';
declare const createNivedyam: (data: any) => Promise<Nivedyam>;
declare const getAllNivedyam: () => Promise<Nivedyam[]>;
declare const updateNivedyam: (id: string, data: any) => Promise<Nivedyam>;
declare const deleteNivedyam: (id: string) => Promise<Nivedyam>;
declare const findNivedyam: (name: string) => Promise<Nivedyam | undefined>;
export { createNivedyam, getAllNivedyam, updateNivedyam, deleteNivedyam, findNivedyam };
//# sourceMappingURL=nivedyamModel.d.ts.map