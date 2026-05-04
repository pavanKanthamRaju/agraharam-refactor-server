export class AppError extends Error{
    constructor(message, status){
        super(message);
        this.statusCode = status;
        this.isOperational = true;
    }
}


export const errorHandler = (err,req,res,next)=>{
    res.status(err.statusCode).json({success:false,message:err.message || "Internal Server Error"})

}
