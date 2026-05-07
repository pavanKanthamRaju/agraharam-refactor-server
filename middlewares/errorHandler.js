export class AppError extends Error{
    constructor(message, status){
        super(message);
        this.statusCode = status;
        this.isOperational = true;
    }
}


export const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  const statusCode = err.statusCode || err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
