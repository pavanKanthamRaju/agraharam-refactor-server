import db from '../config/db.js';
const createItem = async (data) => {
    const { item_name, description, default_quantity, price, units, image } = data;
    const payload = {
        name: item_name,
        description,
        default_quantity,
        price,
        units,
        image
    };
    const result = await db.insert("items", payload);
    console.log("result..." + result.name);
    return result;
};
const getAllItems = async () => {
    const res = await db.query("SELECT * FROM items");
    return res.rows;
};
const updateItem = async (id, data) => {
    const { item_name, description, default_quantity, price, units, image } = data;
    const payload = {
        name: item_name,
        description,
        default_quantity,
        price,
        units,
        image
    };
    const result = await db.update("items", id, payload);
    console.log("result..." + result.name);
    return result;
};
const deleteItem = async (id) => {
    const result = await db.delete("items", id);
    return result;
};
const findItem = async (name) => {
    const result = await db.findItem(name);
    return result;
};
export { createItem, getAllItems, updateItem, deleteItem, findItem };
//# sourceMappingURL=itemsModel.js.map