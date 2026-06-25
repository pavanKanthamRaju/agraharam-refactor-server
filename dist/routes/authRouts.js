import express from "express";
import { z } from "zod";
import { signUp, login, googleLogin } from "../controllers/authControllers.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import { bruteForceLimiter } from "../middlewares/bruteForceMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";
const router = express.Router();
// Zod Schemas
export const loginSchema = z.object({
    identifier: z.coerce.string().min(1, { message: "email/phone number and password should not be empty" }),
    password: z.coerce.string().min(1, { message: "email/phone number and password should not be empty" }),
});
export const signupSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.coerce.string().regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
    role: z.enum(["user", "admin", "vendor"], { message: "Invalid role" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});
export const googleLoginSchema = z.object({
    userInfo: z.object({
        email: z.string().email({ message: "Invalid Google User information provided" }),
        name: z.string().min(1, { message: "Name is required" }),
        picture: z.string().url().optional().nullable(),
        sub: z.coerce.string().min(1, { message: "sub is required" }),
    }),
});
// Configure Brute Force limiters
const authBruteForce = bruteForceLimiter({
    maxFailures: parseInt(process.env.BRUTE_FORCE_MAX_FAILURES || "5", 10),
    windowMs: parseInt(process.env.BRUTE_FORCE_WINDOW_MS || "900000", 10),
    lockoutMs: parseInt(process.env.BRUTE_FORCE_LOCKOUT_MS || "900000", 10),
    getIdentifier: (req) => {
        const body = req.body || {};
        return body.identifier || body.email || body.phone || (body.userInfo && body.userInfo.email);
    }
});
// Routes
router.post("/login", authBruteForce, validateRequest({ body: loginSchema }), asyncHandler(login));
router.post("/signup", authBruteForce, validateRequest({ body: signupSchema }), asyncHandler(signUp));
router.post("/google-login", authBruteForce, validateRequest({ body: googleLoginSchema }), asyncHandler(googleLogin));
export default router;
//# sourceMappingURL=authRouts.js.map