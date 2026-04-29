import express from "express";
const router = express.Router();
import {getUsers, createUser} from "../controllers/userController.js"
import verifyToken from "../middlewares/jwtMiddleware.js"

router.get("/", verifyToken, getUsers)
router.post("/", createUser)

export default router;
