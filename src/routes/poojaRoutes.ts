import express from "express";
import { z } from "zod";
import { getPoojas, postPooja, updatePooja } from "../controllers/poojasController.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

// Zod Schemas
export const createPoojaSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z.coerce.number().positive({ message: "Price must be positive" }),
  duration: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional().nullable(),
});

export const updatePoojaSchema = z.object({
  name: z.string().optional(),
  price: z.coerce.number().positive().optional(),
  duration: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional().nullable(),
});

export const idParamSchema = z.object({
  id: z.coerce.string().min(1, { message: "ID is required" }),
});

// Routes
router.get(
  "/",
  asyncHandler(getPoojas)
);

router.post(
  "/",
  validateRequest({ body: createPoojaSchema }),
  asyncHandler(postPooja)
);

router.put(
  "/:id",
  validateRequest({ params: idParamSchema, body: updatePoojaSchema }),
  asyncHandler(updatePooja)
);

export default router;
