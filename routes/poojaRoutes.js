import express from "express"
import {getPoojas,postPooja, updatePooja} from "../controllers/poojasController.js"
const router = express.Router();
router.get("/", getPoojas);
router.post("/",postPooja);
router.put("/:id", updatePooja);
export default router;

