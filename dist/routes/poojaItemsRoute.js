import express from "express";
import { getPoojaItems, getPoojaItemsById, createPoojaItem, updatePoojaItemById, deletePoojaItemById } from "../controllers/poojaItemsController.js";
const router = express.Router();
router.post("/", createPoojaItem);
router.get("/", getPoojaItems);
router.get("/:pooja_id", getPoojaItemsById);
router.put("/:id", updatePoojaItemById);
router.delete("/:id", deletePoojaItemById);
export default router;
//# sourceMappingURL=poojaItemsRoute.js.map