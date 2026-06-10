import db from '../config/db.js';
const createAnnouncement = async (name, type, description) => {
    const payload = {
        name,
        type,
        description
    };
    const result = await db.insert("announcements", payload);
    return result;
};
const getAllAnnouncements = async () => {
    const result = await db.query(`SELECT * FROM announcements ORDER BY created_at DESC`);
    return result.rows;
};
const updateAnnouncement = async (id, name, type, description) => {
    const result = await db.query(`UPDATE announcements
         SET name = $1, type = $2, description = $3
         WHERE id = $4
         RETURNING *`, [name, type, description, id]);
    return result.rows[0];
};
const deleteAnnouncement = async (id) => {
    const result = await db.query(`DELETE FROM announcements WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
};
export { createAnnouncement, getAllAnnouncements, updateAnnouncement, deleteAnnouncement, };
//# sourceMappingURL=announcementsModel.js.map