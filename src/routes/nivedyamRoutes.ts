import express from "express";
import { z } from "zod";
import { addNivedyam, getNivedyams, updateNivedyamController, deleteNivedyamController } from "../controllers/nivedyamController.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

// Zod Schemas
export const addNivedyamSchema = z.object({
  nivedyam_name: z.string().min(1, { message: "Nivedyam name is required" }),
  description: z.string().optional(),
  category_id: z.coerce.number().int().optional(),
  price: z.coerce.number().positive({ message: "Price must be positive" }),
  unit: z.string().optional(),
  image_url: z.string().optional().nullable(),
});

export const updateNivedyamSchema = z.object({
  nivedyam_name: z.string().optional(),
  description: z.string().optional(),
  category_id: z.coerce.number().int().optional(),
  price: z.coerce.number().positive().optional(),
  unit: z.string().optional(),
  image_url: z.string().optional().nullable(),
});

export const idParamSchema = z.object({
  id: z.coerce.string().min(1, { message: "ID parameter is required" }),
});

// Routes
router.post(
  "/",
  validateRequest({ body: addNivedyamSchema }),
  asyncHandler(addNivedyam)
);

router.get(
  "/",
  asyncHandler(getNivedyams)
);

router.put(
  "/:id",
  validateRequest({ params: idParamSchema, body: updateNivedyamSchema }),
  asyncHandler(updateNivedyamController)
);

router.delete(
  "/:id",
  validateRequest({ params: idParamSchema }),
  asyncHandler(deleteNivedyamController)
);

export default router;
