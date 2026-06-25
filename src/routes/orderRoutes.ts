import express from "express";
import { z } from "zod";
import { placeOrder, getUserOrders, getAllOrders } from "../controllers/orderController.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

// Zod Schemas
export const placeOrderSchema = z.object({
  user_id: z.coerce.string().min(1, { message: "User ID is required" }),
  pooja_id: z.coerce.string().min(1, { message: "Pooja ID is required" }),
  total_amount: z.coerce.number().positive({ message: "Total amount must be positive" }),
  booking_date: z.string().min(1, { message: "Booking date is required" }),
  booking_time: z.string().min(1, { message: "Booking time is required" }),
  phone_number: z.string().regex(/^\d{10}$/, { message: "Invalid phone number. Must be 10 digits." }),
  address: z.string().min(1, { message: "Address is required" }),
});

export const userIdParamSchema = z.object({
  user_id: z.coerce.string().min(1, { message: "User ID parameter is required" }),
});

// Routes
router.post(
  "/",
  validateRequest({ body: placeOrderSchema }),
  asyncHandler(placeOrder)
);

router.get(
  "/getAllOrders",
  asyncHandler(getAllOrders)
);

router.get(
  "/:user_id",
  validateRequest({ params: userIdParamSchema }),
  asyncHandler(getUserOrders)
);

export default router;
