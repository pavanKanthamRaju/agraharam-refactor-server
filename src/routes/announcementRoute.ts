import express from 'express';
import { z } from 'zod';
import * as announcementController from "../controllers/announcementsController.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

// Zod Schemas
export const createAnnouncementSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export const updateAnnouncementSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export const idParamSchema = z.object({
  id: z.coerce.string().min(1, { message: "ID parameter is required" }),
});

// CRUD Routes
router.post(
  '/',
  validateRequest({ body: createAnnouncementSchema }),
  asyncHandler(announcementController.createAnnouncement)
);

router.get(
  '/',
  asyncHandler(announcementController.getAllAnnouncements)
);

router.put(
  '/:id',
  validateRequest({ params: idParamSchema, body: updateAnnouncementSchema }),
  asyncHandler(announcementController.updateAnnouncement)
);

router.delete(
  '/:id',
  validateRequest({ params: idParamSchema }),
  asyncHandler(announcementController.deleteAnnouncement)
);

export default router;
