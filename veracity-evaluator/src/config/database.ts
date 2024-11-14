import mongoose from 'mongoose';
import { CONFIG } from './environment';

export async function loadMongoose() {
    const connect = await mongoose.connect(CONFIG.mongoUri);
    const connection = connect.connection;
    connection.on(
        'error',
        console.error.bind(console, 'MongoDB connection error: ')
    );

    return connection;
};