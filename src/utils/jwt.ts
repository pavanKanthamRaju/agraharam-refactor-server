import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { JWTPayload, User } from '../types/index.js';

const SECRET_KEY = process.env.JWT_SECRET || '';

const generateToken = (user: User): string => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role } as JWTPayload,
        SECRET_KEY,
        { expiresIn: "7d" }
    );
};

export { generateToken };
