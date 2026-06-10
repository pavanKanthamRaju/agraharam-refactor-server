import db from '../config/db.js';
import { getCache, serCache } from '../config/redis.js';
const getAllPoojas = async () => {
    const cacheKey = "all_poojas";
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
        console.log("Cache hit for poojas");
        return cachedData;
    }
    console.log("Cache miss for poojas, fetching from DB...");
    const result = await db.query("SELECT * FROM poojas");
    await serCache(cacheKey, result.rows);
    return result.rows;
};
const createPooja = async (pooja) => {
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
        return result;
    }
    catch (error) {
        console.error("DB INSERT ERROR:", error);
        throw error;
    }
};
const modifyPooja = async (id, pooja) => {
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
    return result;
};
export { getAllPoojas, createPooja, modifyPooja };
//# sourceMappingURL=poojaModel.js.map