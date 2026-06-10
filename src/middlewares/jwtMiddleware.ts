import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest, JWTPayload } from "../types/index.js";

const SECRET_KEY = process.env.JWT_SECRET || '';

const verifyToken = (req: Request, res: Response, next: NextFunction): Response | void => {
    const authHeader = req.headers.authorization;
    console.log(`jwt token is: ${authHeader}`);
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized - No token Provided" });
    }
    
    const token = authHeader.split(" ")[1];
    
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY) as JWTPayload;
        (req as AuthenticatedRequest).user = decodedToken;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};

export default verifyToken;
