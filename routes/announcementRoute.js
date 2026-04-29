import express from 'express';
const router = express.Router();
import * as announcementController from "../controllers/announcementsController.js";

// CRUD Routes
router.post('/', announcementController.createAnnouncement);
router.get('/', announcementController.getAllAnnouncements);
router.put('/:id', announcementController.updateAnnouncement);
router.delete('/:id', announcementController.deleteAnnouncement);

export default router;
