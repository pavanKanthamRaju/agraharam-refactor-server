import express from "express";
import { z } from "zod";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";
const router = express.Router();
// Zod Schemas
export const createPaymentOrderSchema = z.object({
    amount: z.coerce.number().positive({ message: "Amount must be positive" }),
    currency: z.string().optional().default("INR"),
});
export const verifyPaymentSchema = z.object({
    razorpay_order_id: z.string().min(1, { message: "Razorpay order ID is required" }),
    razorpay_payment_id: z.string().min(1, { message: "Razorpay payment ID is required" }),
    razorpay_signature: z.string().min(1, { message: "Razorpay signature is required" }),
    user_id: z.coerce.string().min(1, { message: "User ID is required" }),
    pooja_id: z.coerce.string().min(1, { message: "Pooja ID is required" }),
    total_amount: z.coerce.number().positive({ message: "Total amount must be positive" }),
    booking_date: z.string().min(1, { message: "Booking date is required" }),
    booking_time: z.string().min(1, { message: "Booking time is required" }),
    phone_number: z.string().regex(/^\d{10}$/, { message: "Invalid phone number. Must be 10 digits." }),
    address: z.string().min(1, { message: "Address is required" }),
});
// Routes
router.post("/create-order", validateRequest({ body: createPaymentOrderSchema }), asyncHandler(createOrder));
router.post("/verify-payment", validateRequest({ body: verifyPaymentSchema }), asyncHandler(verifyPayment));
export default router;
//# sourceMappingURL=paymentRoutes.js.map