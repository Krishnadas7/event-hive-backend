import { createClient } from 'redis';

let redisClient:any;

export const connectToRedis = async () => {
    if (!redisClient) {
        redisClient = createClient();
        redisClient.on('error', (err:any) => console.error('Redis Client Error', err));

        try {
            await redisClient.connect();
            console.log('Connected to Redis');
        } catch (error) {
            console.error('Error connecting to Redis:', error);
            throw error;
        }
    }
};

export const disconnectFromRedis = async () => {
    if (redisClient) {
        try {
            await redisClient.quit();
            console.log('Disconnected from Redis');
        } catch (error) {
            console.error('Error disconnecting from Redis:', error);
            throw error;
        }
    } else {
        console.warn('Redis client is not initialized');
    }
};

export { redisClient };
