import { Request, Response } from 'express';
declare const createOrder: (req: Request, res: Response) => Promise<void>;
declare const verifyPayment: (req: Request, res: Response) => Promise<void>;
export { createOrder, verifyPayment };
//# sourceMappingURL=paymentController.d.ts.map