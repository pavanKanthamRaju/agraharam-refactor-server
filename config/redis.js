import { createClient } from 'redis';
const client = createClient();

client.on("error",(err)=>{
    console.error("reddis Error : ",err )
})

client.on("connect",()=>{
    console.log("Redis connected successfully....")
})

client.connect();

export const getCache = async (key) =>{
    try{
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    }
    catch(err){
        console.error("Redis Cache Get Error : ", err)
        return null;
    }
}
export const serCache  = async (key, value, ttl = 3600) =>{
    try{
        await client.setEx(key, ttl, JSON.stringify(value));
    }catch(err){
        console.error("Redis Cache Set Error : ", err)
    }
}
export const deleteCache = async(key) =>{
    await client.del(key);
}
export default client;
