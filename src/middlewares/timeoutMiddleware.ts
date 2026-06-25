import { Request, Response, NextFunction } from 'express';

export const requestTimeout = (timeoutMs: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if ((req as any).skipTimeout) {
      return next();
    }

    const timer = setTimeout(() => {
      if (!res.headersSent) {
        res.status(408).json({
          success: false,
          message: "Request Timeout"
        });
      }
    }, timeoutMs);

    res.on('finish', () => clearTimeout(timer));
    res.on('close', () => clearTimeout(timer));
    next();
  };
};

export const bypassTimeout = (req: Request, res: Response, next: NextFunction) => {
  (req as any).skipTimeout = true;
  next();
};
