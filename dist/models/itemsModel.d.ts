import { Item } from '../types/index.js';
declare const createItem: (data: any) => Promise<Item>;
declare const getAllItems: () => Promise<Item[]>;
declare const updateItem: (id: string, data: any) => Promise<Item>;
declare const deleteItem: (id: string) => Promise<Item>;
declare const findItem: (name: string) => Promise<Item | undefined>;
export { createItem, getAllItems, updateItem, deleteItem, findItem };
//# sourceMappingURL=itemsModel.d.ts.map