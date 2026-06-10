import db from '../config/db.js';
import { Item } from '../types/index.js';

const createItem = async (data: any): Promise<Item> => {
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

const getAllItems = async (): Promise<Item[]> => {
    const res = await db.query("SELECT * FROM items");
    return res.rows;
};

const updateItem = async (id: string, data: any): Promise<Item> => {
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

const deleteItem = async (id: string): Promise<Item> => {
    const result = await db.delete("items", id);
    return result;
};

const findItem = async (name: string): Promise<Item | undefined> => {
    const result = await db.findItem(name);
    return result;
};

export { createItem, getAllItems, updateItem, deleteItem, findItem };
