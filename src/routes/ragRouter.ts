import express from "express";
import { z } from "zod";
import { askRagData, createAndStoreEmbedding } from "../controllers/ragController.js";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadAndProcess } from "../controllers/documentController.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import { bypassTimeout } from "../middlewares/timeoutMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

// Zod Schemas
export const askRagSchema = z.object({
  question: z.string().min(1, { message: "Question cannot be empty" }),
});

export const storeEmbedSchema = z.object({
  content: z.string().min(1, { message: "Content cannot be empty" }),
});

// Routes
router.post(
  "/",
  validateRequest({ body: askRagSchema }),
  asyncHandler(askRagData)
);

router.post(
  "/storeEmbed",
  validateRequest({ body: storeEmbedSchema }),
  asyncHandler(createAndStoreEmbedding)
);

router.post(
  "/upload",
  bypassTimeout,
  upload.single("pdf"),
  asyncHandler(uploadAndProcess)
);

export default router;
