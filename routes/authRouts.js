import express from "express"
const router = express.Router();
import {signUp, login, googleLogin} from "../controllers/authControllers.js"

router.post("/login", login )
router.post ("/signup", signUp)
router.post ("/google-login", googleLogin)

export default router;