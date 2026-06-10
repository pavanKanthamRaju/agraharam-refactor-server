import { Pooja } from '../types/index.js';
declare const getAllPoojas: () => Promise<Pooja[]>;
declare const createPooja: (pooja: any) => Promise<Pooja>;
declare const modifyPooja: (id: string, pooja: any) => Promise<Pooja>;
export { getAllPoojas, createPooja, modifyPooja };
//# sourceMappingURL=poojaModel.d.ts.map