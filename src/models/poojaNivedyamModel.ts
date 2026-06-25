import db from '../config/db.js';

const getAllPoojaNivedyam = async () => {
    const result = await db.query(`
        SELECT pn.id, pn.pooja_id, pn.nivedyam_id, pn.price, pn.quantity, pn.units, n.name as nivedyam_name
        FROM pooja_nivedyam pn
        JOIN nivedyam n ON pn.nivedyam_id = n.id
        WHERE n.deleted_at IS NULL
    `);
    return result.rows;
};

const getNivedyamByPooja = async (pooja_id: string) => {
    const result = await db.query(`
        SELECT pn.id, pn.quantity, pn.price, pn.units, n.id as nivedyam_id, n.name, n.image_url
        FROM pooja_nivedyam pn
        JOIN nivedyam n ON pn.nivedyam_id = n.id
        WHERE pn.pooja_id = $1 AND n.deleted_at IS NULL
    `, [pooja_id]);
    return result.rows;
};

const addPoojaNivedyam = async (data: any) => {
    const { pooja_id, nivedyam_id, quantity, price, units } = data;
    const payload = {
        pooja_id,
        nivedyam_id,
        quantity,
        price,
        units
    };
    const result = await db.insert("pooja_nivedyam", payload);
    console.log("result..." + result.name);
    return result;
};

const updatePoojaNivedyam = async (id: string, data: any) => {
    const { quantity, price } = data;
    const payload = {
        quantity,
        price
    };
    const result = await db.update("pooja_nivedyam", id, payload);
    console.log("result..." + result.name);
    return result;
};

const deletePoojaNivedyam = async (id: string) => {
    const result = await db.delete("pooja_nivedyam", id);
    return result;
};

export { getAllPoojaNivedyam, getNivedyamByPooja, addPoojaNivedyam, updatePoojaNivedyam, deletePoojaNivedyam };
