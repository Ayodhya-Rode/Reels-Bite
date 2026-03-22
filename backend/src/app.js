//create server

import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import foodPartnerRoutes from "./routes/foodPartner.routes.js"
import foodItemRoutes from "./routes/foodItem.route.js"


const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());


app.use('/api/auth', authRoutes);

app.use("/api/auth",foodPartnerRoutes)

app.use("/api/food", foodItemRoutes);

export default app;
