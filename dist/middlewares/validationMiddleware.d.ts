import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
export declare const validateRequest: (schemas: {
    body?: ZodSchema;
    query?: ZodSchema;
    params?: ZodSchema;
}) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=validationMiddleware.d.ts.map