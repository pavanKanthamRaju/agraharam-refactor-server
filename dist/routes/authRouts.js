import express from "express";
import { signUp, login, googleLogin } from "../controllers/authControllers.js";
const router = express.Router();
router.post("/login", login);
router.post("/signup", signUp);
router.post("/google-login", googleLogin);
export default router;
//# sourceMappingURL=authRouts.js.map