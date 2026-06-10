import { Request, Response } from 'express';
declare const placeOrder: (req: Request, res: Response) => Promise<void>;
declare const getUserOrders: (req: Request, res: Response) => Promise<void>;
declare const getAllOrders: (req: Request, res: Response) => Promise<void>;
export { placeOrder, getUserOrders, getAllOrders };
//# sourceMappingURL=orderController.d.ts.map