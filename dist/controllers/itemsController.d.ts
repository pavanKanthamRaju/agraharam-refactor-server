import { Request, Response } from 'express';
declare const addItem: (req: Request, res: Response) => Promise<void>;
declare const getItems: (req: Request, res: Response) => Promise<void>;
declare const updateItemController: (req: Request, res: Response) => Promise<void>;
declare const deleteItemController: (req: Request, res: Response) => Promise<void>;
export { addItem, getItems, updateItemController, deleteItemController };
//# sourceMappingURL=itemsController.d.ts.map