import { Request, Response, NextFunction } from "express";
interface BruteForceOptions {
    maxFailures: number;
    windowMs: number;
    lockoutMs: number;
    getIdentifier?: (req: Request) => string | undefined;
}
export declare const bruteForceLimiter: (options: BruteForceOptions) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const bypassBruteForce: (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=bruteForceMiddleware.d.ts.map