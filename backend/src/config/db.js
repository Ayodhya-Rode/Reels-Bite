import mongoose from 'mongoose';
import config from './config.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

export default connectDB;