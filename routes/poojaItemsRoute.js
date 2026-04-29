import express from "express";
const router = express.Router();
import {getPoojaItems, getPoojaItemsById, createPoojaItem, updatePoojaItemById, deletePoojaItemById} from "../controllers/poojaItemsController.js";

router.post("/", createPoojaItem);
router.get("/", getPoojaItems);
router.get("/:pooja_id", getPoojaItemsById);
router.put("/:id", updatePoojaItemById);
router.delete("/:id", deletePoojaItemById);

export default router;
