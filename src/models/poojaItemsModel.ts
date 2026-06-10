import db from '../config/db.js';

const getAllPoojaItems = async () => {
    const result = await db.query(`
        SELECT pi.id, pi.pooja_id, pi.item_id, pi.quantity, i.name as item_name
        FROM pooja_items pi
        JOIN items i ON pi.item_id = i.id
    `);
    return result.rows;
};

const getItemsByPooja = async (pooja_id: string) => {
    const result = await db.query(`
        SELECT pi.id, pi.quantity, pi.price, pi.units, i.id as item_id, i.name, i.image
        FROM pooja_items pi
        JOIN items i ON pi.item_id = i.id
        WHERE pi.pooja_id = $1
    `, [pooja_id]);
    return result.rows;
};

const addPoojaItem = async (data: any) => {
    const { pooja_id, item_id, quantity, price, units } = data;
    const payload = {
        pooja_id,
        item_id,
        quantity,
        price,
        units
    };
    const result = await db.insert("pooja_items", payload);
    console.log("result..." + result.name);
    return result;
};

const updatePoojaItem = async (id: string, data: any) => {
    const { quantity, price } = data;
    const payload = {
        quantity,
        price
    };
    const result = await db.update("pooja_items", id, payload);
    console.log("result..." + result.name);
    return result;
};

const deletePoojaItem = async (id: string) => {
    const result = await db.delete("pooja_items", id);
    return result;
};

export { getAllPoojaItems, getItemsByPooja, updatePoojaItem, deletePoojaItem, addPoojaItem };
