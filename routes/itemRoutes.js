import express from "express";
const router = express.Router();
import { addItem, getItems,updateItemController,deleteItemController } from "../controllers/itemsController.js";

router.post("/", addItem);
router.get("/", getItems);
router.put("/:id", updateItemController);
router.delete("/:id", deleteItemController);

export default router;
