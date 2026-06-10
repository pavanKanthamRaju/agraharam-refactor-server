declare const getAllPoojaItems: () => Promise<any[]>;
declare const getItemsByPooja: (pooja_id: string) => Promise<any[]>;
declare const addPoojaItem: (data: any) => Promise<any>;
declare const updatePoojaItem: (id: string, data: any) => Promise<any>;
declare const deletePoojaItem: (id: string) => Promise<any>;
export { getAllPoojaItems, getItemsByPooja, updatePoojaItem, deletePoojaItem, addPoojaItem };
//# sourceMappingURL=poojaItemsModel.d.ts.map