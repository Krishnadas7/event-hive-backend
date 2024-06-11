import dotenv from 'dotenv'
import express from 'express';
import userRouter from '../routes/userRoute';
import adminRoute from '../routes/adminRoute';
import companyRoute from '../routes/companyRoute'
import conversationRoute from '../routes/conversationRoute'
import messageRoute from '../routes/messageRoute'
import redis from 'redis'
import { createClient } from 'redis';
import errorHandler from '../../usecaseLayer/handler/errorHanadler';
import path from 'path'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server, Socket } from 'socket.io';
// import ''

const envFilePath = path.resolve(__dirname, '../../.././../.env');
dotenv.config({ path: envFilePath })
export const app = express();
export const redisClient = createClient();
redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.connect().catch(console.error);
const io = require('socket.io')(8900,{
    cors:{
        orign:"http://localhost:3003"
    },
})
interface User {
    userId: any;
    socketId: any;
}

let users: User[] = [];
const addUser = (userId: any, socketId: any) => {
    !users.some((user: User) => user.userId === userId) && users.push({ userId, socketId });
}
const removeUser = (socketId:any)=>{
  users= users.filter((user)=>user.socketId!==socketId)
}
const getUser = (userId:string) =>{
    return users.find(user=>user.userId===userId)
}
io.on('connection',(socket:Socket) =>{
    //when connect
    console.log('a user is connected')
   socket.on("addUser",(userId) =>{
    addUser(userId,socket.id)
    io.emit('getUser',users)
   })
    //send and get message
    socket.on("sendMessage",({senderId,receiverId,text})=>{
     const user = getUser(receiverId)
     io.to(user?.socketId).emit('getMessage',{
        senderId,
        text
     })
    })
    //when disconnect
   socket.on('disconnect',()=>{
    console.log('a user is disconnected')
    removeUser(socket.id)
    io.emit('getUser',users)
   })
})
// const userdta = {name:"sanu"}
// redisClient.setEx('1', 300, JSON.stringify({ userdta}));
// const abc = async ()=>{
//     const data =await  redisClient.get('1');
//     console.log('from redis',data)
// }
// abc()


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
app.use('/api/company',companyRoute)
app.use('/api/conversation',conversationRoute)
app.use('/api/message',messageRoute)

app.use(errorHandler)
