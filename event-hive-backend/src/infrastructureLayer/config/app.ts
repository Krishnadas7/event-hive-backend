import dotenv from 'dotenv'
import express from 'express';
import userRouter from '../routes/userRoute';
import adminRoute from '../routes/adminRoute';
import path from 'path'
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import ''
const envFilePath = path.resolve(__dirname, '../../.././../.env');
dotenv.config({ path: envFilePath })
export const app = express();
// console.log(process.env.ACCESS_TOKEN_KEY);
// console.log(process.env.REFRESH_TOKEN_KEY);

// console.log(process.env);


// Use cookie parser middleware


// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Allow cookies to be sent along with requests
}));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use('/api/user', userRouter);
app.use('/api/admin',adminRoute)
