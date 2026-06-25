import express from "express";
import { z } from "zod";
import { getPoojaNivedyams, getPoojaNivedyamsById, createPoojaNivedyam, updatePoojaNivedyamById, deletePoojaNivedyamById } from "../controllers/poojaNivedyamController.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";
const router = express.Router();
// Zod Schemas
export const createPoojaNivedyamSchema = z.object({
    pooja_id: z.coerce.string().min(1, { message: "Pooja ID is required" }),
    nivedyam_id: z.coerce.string().min(1, { message: "Nivedyam ID is required" }),
    price: z.coerce.number().positive({ message: "Price must be positive" }),
    quantity: z.coerce.string().optional().default("1"),
    units: z.string().optional(),
});
export const updatePoojaNivedyamSchema = z.object({
    quantity: z.coerce.string().optional(),
    price: z.coerce.number().positive({ message: "Price must be positive" }).optional(),
});
export const poojaIdParamSchema = z.object({
    pooja_id: z.coerce.string().min(1, { message: "Pooja ID is required" }),
});
export const idParamSchema = z.object({
    id: z.coerce.string().min(1, { message: "ID is required" }),
});
// Routes
router.post("/", validateRequest({ body: createPoojaNivedyamSchema }), asyncHandler(createPoojaNivedyam));
router.get("/", asyncHandler(getPoojaNivedyams));
router.get("/:pooja_id", validateRequest({ params: poojaIdParamSchema }), asyncHandler(getPoojaNivedyamsById));
router.put("/:id", validateRequest({ params: idParamSchema, body: updatePoojaNivedyamSchema }), asyncHandler(updatePoojaNivedyamById));
router.delete("/:id", validateRequest({ params: idParamSchema }), asyncHandler(deletePoojaNivedyamById));
export default router;
//# sourceMappingURL=poojaNivedyamRoute.js.map