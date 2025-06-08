import mongoose from 'mongoose';
import { env } from '../config/env';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.DATABASE_URL);
        console.info(`[Database] Connected to MongoDB: ${conn.connection.name} ✅`);
    } catch (err) {
        console.error(`[Database] Connection error ❌`, err);
        process.exit(1);
    }
};

export default connectDB;