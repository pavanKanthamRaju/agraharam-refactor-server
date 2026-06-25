import { Request, Response, NextFunction } from 'express';
export declare const globalRateLimiter: import("express-rate-limit").RateLimitRequestHandler;
export declare const bypassRateLimit: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=rateLimitMiddleware.d.ts.map