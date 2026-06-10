import { Request, Response } from 'express';
declare const getPoojaItems: (req: Request, res: Response) => Promise<void>;
declare const getPoojaItemsById: (req: Request, res: Response) => Promise<void>;
declare const createPoojaItem: (req: Request, res: Response) => Promise<void>;
declare const updatePoojaItemById: (req: Request, res: Response) => Promise<void>;
declare const deletePoojaItemById: (req: Request, res: Response) => Promise<void>;
export { getPoojaItems, getPoojaItemsById, createPoojaItem, updatePoojaItemById, deletePoojaItemById };
//# sourceMappingURL=poojaItemsController.d.ts.map