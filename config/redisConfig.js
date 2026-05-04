import {createClient} from 'redis';


const client = createClient({
    socket: {
        host:  process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
    },
    password: rprocess.env.REDIS_PASSWORD || undefined,
});

client.on('error', (err) => {
    console.error('Redis Error:', err);
});

client.on('connect', () => {
    console.log('Redis connected successfully...');
});

await client.connect();

export default client;
