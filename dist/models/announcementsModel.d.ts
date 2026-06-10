import { Announcement } from '../types/index.js';
declare const createAnnouncement: (name: string, type: string, description: string) => Promise<Announcement>;
declare const getAllAnnouncements: () => Promise<Announcement[]>;
declare const updateAnnouncement: (id: string, name: string, type: string, description: string) => Promise<Announcement>;
declare const deleteAnnouncement: (id: string) => Promise<Announcement>;
export { createAnnouncement, getAllAnnouncements, updateAnnouncement, deleteAnnouncement, };
//# sourceMappingURL=announcementsModel.d.ts.map