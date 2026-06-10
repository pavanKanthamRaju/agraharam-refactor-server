import express from "express";
import { placeOrder, getUserOrders, getAllOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", placeOrder);
router.get("/getAllOrders", getAllOrders);
router.get("/:user_id", getUserOrders);

export default router;
