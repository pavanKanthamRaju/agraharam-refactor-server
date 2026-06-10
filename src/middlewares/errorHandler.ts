import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
    constructor(public message: string, public statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error("ERROR:", err);

    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
    });
};
