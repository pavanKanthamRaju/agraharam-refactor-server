import { createClient } from 'redis';
const client = createClient();

client.on("error",(err)=>{
    console.error("reddis Error : ",err )
})

client.on("connect",()=>{
    console.log("Redis connected successfully....")
})

client.connect();
export default client;