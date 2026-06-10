import express from 'express';
import * as announcementController from "../controllers/announcementsController.js";

const router = express.Router();

// CRUD Routes
router.post('/', announcementController.createAnnouncement);
router.get('/', announcementController.getAllAnnouncements);
router.put('/:id', announcementController.updateAnnouncement);
router.delete('/:id', announcementController.deleteAnnouncement);

export default router;
