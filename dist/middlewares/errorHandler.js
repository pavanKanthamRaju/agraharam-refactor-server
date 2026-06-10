export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export const errorHandler = (err, req, res, next) => {
    console.error("ERROR:", err);
    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        message,
    });
};
//# sourceMappingURL=errorHandler.js.map