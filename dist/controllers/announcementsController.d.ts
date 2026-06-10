import { Request, Response } from 'express';
declare const createAnnouncement: (req: Request, res: Response) => Promise<void>;
declare const getAllAnnouncements: (req: Request, res: Response) => Promise<void>;
declare const updateAnnouncement: (req: Request, res: Response) => Promise<void>;
declare const deleteAnnouncement: (req: Request, res: Response) => Promise<void>;
export { createAnnouncement, getAllAnnouncements, updateAnnouncement, deleteAnnouncement };
//# sourceMappingURL=announcementsController.d.ts.map