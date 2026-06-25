import { Request, Response, NextFunction } from 'express';
export declare const requestTimeout: (timeoutMs: number) => (req: Request, res: Response, next: NextFunction) => void;
export declare const bypassTimeout: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=timeoutMiddleware.d.ts.map