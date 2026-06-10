import db from '../config/db.js';
import { Announcement } from '../types/index.js';

const createAnnouncement = async (name: string, type: string, description: string): Promise<Announcement> => {
    const payload = {
        name,
        type,
        description
    };
    const result = await db.insert("announcements", payload);
    return result;
};

const getAllAnnouncements = async (): Promise<Announcement[]> => {
    const result = await db.query(
        `SELECT * FROM announcements ORDER BY created_at DESC`
    );
    return result.rows;
};

const updateAnnouncement = async (id: string, name: string, type: string, description: string): Promise<Announcement> => {
    const result = await db.query(
        `UPDATE announcements
         SET name = $1, type = $2, description = $3
         WHERE id = $4
         RETURNING *`,
        [name, type, description, id]
    );
    return result.rows[0];
};

const deleteAnnouncement = async (id: string): Promise<Announcement> => {
    const result = await db.query(
        `DELETE FROM announcements WHERE id = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
};

export {
    createAnnouncement,
    getAllAnnouncements,
    updateAnnouncement,
    deleteAnnouncement,
};
