import express from "express"
import {askRagData,createAnsdStoreEmbedding} from "../controllers/ragController.js";
import upload from "../middlewares/uploadMiddleware.js";
import {uploadAndProcess} from "../controllers/documentController.js"



const router  = express.Router();

router.post("/", askRagData);
router.post("/storeEmbed", createAnsdStoreEmbedding);
router.post("/upload", upload.single("pdf"), uploadAndProcess);

export default router;
