import db from '../config/db.js';
import { Pooja } from '../types/index.js';
import { getCache, serCache, deleteCache } from '../config/redis.js';

const getAllPoojas = async (): Promise<Pooja[]> => {
    const cacheKey = "all_poojas";
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
        console.log("Cache hit for poojas");
        return cachedData;
    }
    console.log("Cache miss for poojas, fetching from DB...");
const dbStart = Date.now();

const result = await db.query("SELECT * FROM poojas");

console.log("DB Query Time:", Date.now() - dbStart, "ms");

    await serCache(cacheKey, result.rows);
    return result.rows;
};

const createPooja = async (pooja: any): Promise<Pooja> => {
    const { name, price, duration, description, image = null } = pooja;
    console.log(`the input data is ${name}, ${price}, ${duration}, ${description}, ${image}`);

    const payload = {
        name,
        base_price: price,
        duration,
        description,
        image_url: image
    };

    try {
        const result = await db.insert("poojas", payload);
        console.log("RESULT:", result);
        await deleteCache("all_poojas");
        return result;
    } catch (error) {
        console.error("DB INSERT ERROR:", error);
        throw error;
    }
};

const modifyPooja = async (id: string, pooja: any): Promise<Pooja> => {
    const { name, price, duration, description, image } = pooja;
    const payload = {
        name,
        base_price: price,
        duration,
        description,
        image_url: image
    };
    const result = await db.update("poojas", id, payload);
    console.log("result..." + result.name);
    await deleteCache("all_poojas");
    return result;
};

export { getAllPoojas, createPooja, modifyPooja };
