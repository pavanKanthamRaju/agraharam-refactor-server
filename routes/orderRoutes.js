import express from "express";
const router = express.Router();
import { getUserOrders, getAllOrders } from "../controllers/orderController.js";
router.get("/getAllOrders", getAllOrders);
// GET all orders for a user
router.get("/:user_id", getUserOrders);


export default router;
