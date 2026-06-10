import express from "express";
import { addItem, getItems, updateItemController, deleteItemController } from "../controllers/itemsController.js";

const router = express.Router();

router.post("/", addItem);
router.get("/", getItems);
router.put("/:id", updateItemController);
router.delete("/:id", deleteItemController);

export default router;
