import { createClient } from 'redis';

const client = createClient();

client.on("error", (err: Error) => {
    console.error("Redis Error : ", err);
});

client.on("connect", () => {
    console.log("Redis connected successfully....");
});

client.connect();

export const getCache = async (key: string): Promise<any> => {
    try {
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.error("Redis Cache Get Error : ", err);
        return null;
    }
};

export const serCache = async (key: string, value: any, ttl: number = 3600): Promise<void> => {
    try {
        await client.setEx(key, ttl, JSON.stringify(value));
    } catch (err) {
        console.error("Redis Cache Set Error : ", err);
    }
};

export const deleteCache = async (key: string): Promise<void> => {
    await client.del(key);
};

export default client;
