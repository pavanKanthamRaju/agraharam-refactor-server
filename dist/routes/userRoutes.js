import express from "express";
import { z } from "zod";
import { getUsers, createUser } from "../controllers/userController.js";
import verifyToken from "../middlewares/jwtMiddleware.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import { bruteForceLimiter } from "../middlewares/bruteForceMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";
const router = express.Router();
// Zod Schemas
export const createUserSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    phone: z.coerce.string().regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
    role: z.enum(["user", "admin", "vendor"], { message: "Invalid role" }).optional().default("user"),
});
// Configure Brute Force limiter
const registerBruteForce = bruteForceLimiter({
    maxFailures: parseInt(process.env.BRUTE_FORCE_MAX_FAILURES || "5", 10),
    windowMs: parseInt(process.env.BRUTE_FORCE_WINDOW_MS || "900000", 10),
    lockoutMs: parseInt(process.env.BRUTE_FORCE_LOCKOUT_MS || "900000", 10),
    getIdentifier: (req) => {
        const body = req.body || {};
        return body.email || body.phone;
    }
});
// Routes
router.get("/", verifyToken, asyncHandler(getUsers));
router.post("/", registerBruteForce, validateRequest({ body: createUserSchema }), asyncHandler(createUser));
export default router;
//# sourceMappingURL=userRoutes.js.map