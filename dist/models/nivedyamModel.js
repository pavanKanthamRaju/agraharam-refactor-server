import db from '../config/db.js';
const createNivedyam = async (data) => {
    const { nivedyam_name, description, category_id, price, unit, image_url } = data;
    const payload = {
        name: nivedyam_name,
        description,
        category_id,
        price,
        unit,
        image_url
    };
    const result = await db.insert("nivedyam", payload);
    console.log("result..." + result.name);
    return result;
};
const getAllNivedyam = async () => {
    const res = await db.query("SELECT * FROM nivedyam WHERE deleted_at IS NULL");
    return res.rows;
};
const updateNivedyam = async (id, data) => {
    const { nivedyam_name, description, category_id, price, unit, image_url } = data;
    const payload = {
        name: nivedyam_name,
        description,
        category_id,
        price,
        unit,
        image_url,
        updated_at: new Date()
    };
    const result = await db.update("nivedyam", id, payload);
    console.log("result..." + result.name);
    return result;
};
const deleteNivedyam = async (id) => {
    // Perform soft delete by setting deleted_at
    const payload = {
        deleted_at: new Date()
    };
    const result = await db.update("nivedyam", id, payload);
    return result;
};
const findNivedyam = async (name) => {
    const sql = `SELECT * FROM nivedyam WHERE name = $1 AND deleted_at IS NULL`;
    const result = await db.query(sql, [name]);
    return result.rows[0];
};
export { createNivedyam, getAllNivedyam, updateNivedyam, deleteNivedyam, findNivedyam };
//# sourceMappingURL=nivedyamModel.js.map