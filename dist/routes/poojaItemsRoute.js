import express from "express";
import { z } from "zod";
import { getPoojaItems, getPoojaItemsById, createPoojaItem, updatePoojaItemById, deletePoojaItemById } from "../controllers/poojaItemsController.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";
const router = express.Router();
// Zod Schemas
export const createPoojaItemSchema = z.object({
    pooja_id: z.coerce.string().min(1, { message: "Pooja ID is required" }),
    item_id: z.coerce.string().min(1, { message: "Item ID is required" }),
    quantity: z.coerce.string().optional().default("1"),
    price: z.coerce.number().positive({ message: "Price must be positive" }),
    units: z.string().optional(),
});
export const updatePoojaItemSchema = z.object({
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
router.post("/", validateRequest({ body: createPoojaItemSchema }), asyncHandler(createPoojaItem));
router.get("/", asyncHandler(getPoojaItems));
router.get("/:pooja_id", validateRequest({ params: poojaIdParamSchema }), asyncHandler(getPoojaItemsById));
router.put("/:id", validateRequest({ params: idParamSchema, body: updatePoojaItemSchema }), asyncHandler(updatePoojaItemById));
router.delete("/:id", validateRequest({ params: idParamSchema }), asyncHandler(deletePoojaItemById));
export default router;
//# sourceMappingURL=poojaItemsRoute.js.map