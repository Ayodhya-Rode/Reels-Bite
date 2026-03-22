import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
}
if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined in the environment variables');
}
if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('REFRESH_TOKEN_SECRET is not defined in the environment variables');
}
if(!process.env.IMAGEKIT_URL_ENDPOINT){
    throw new Error('IMAGEKIT_URL_ENDPOINT is not defined in the environment variables');
}
if(!process.env.IMAGEKIT_PRIVATE_KEY){
    throw new Error('IMAGEKIT_PRIVATE_KEY is not defined in the environment variables');
}
if(!process.env.IMAGEKIT_PUBLIC_KEY){
    throw new Error('IMAGEKIT_PUBLIC_KEY is not defined in the environment variables');
}


const config = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY


};

export default config;