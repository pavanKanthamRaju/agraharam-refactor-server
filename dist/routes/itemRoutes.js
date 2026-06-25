import express from "express";
import { z } from "zod";
import { addItem, getItems, updateItemController, deleteItemController } from "../controllers/itemsController.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";
const router = express.Router();
// Zod Schemas
export const addItemSchema = z.object({
    item_name: z.string().min(1, { message: "Item name is required" }),
    description: z.string().optional(),
    default_quantity: z.coerce.number().int().optional(),
    price: z.coerce.number().positive({ message: "Price must be positive" }),
    units: z.string().optional(),
    image: z.string().optional().nullable(),
});
export const updateItemSchema = z.object({
    item_name: z.string().optional(),
    description: z.string().optional(),
    default_quantity: z.coerce.number().int().optional(),
    price: z.coerce.number().positive().optional(),
    units: z.string().optional(),
    image: z.string().optional().nullable(),
});
export const idParamSchema = z.object({
    id: z.coerce.string().min(1, { message: "ID parameter is required" }),
});
// Routes
router.post("/", validateRequest({ body: addItemSchema }), asyncHandler(addItem));
router.get("/", asyncHandler(getItems));
router.put("/:id", validateRequest({ params: idParamSchema, body: updateItemSchema }), asyncHandler(updateItemController));
router.delete("/:id", validateRequest({ params: idParamSchema }), asyncHandler(deleteItemController));
export default router;
//# sourceMappingURL=itemRoutes.js.map