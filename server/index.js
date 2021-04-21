import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import userRoutes from './routes/user.js'
import chatRoomRoutes from './routes/chatRoom.js'
import messageRoutes from './routes/message.js'
import socket from './controllers/socket.js'
import { Server } from 'socket.io'
import http from 'http'



const app = express();

dotenv.config();

app.use(
  bodyParser.json({
    limit: "30mb",
    extended: true,
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  }) 
);

app.use(cors());
app.use('/user', userRoutes);
app.use('/chatRoom', chatRoomRoutes);
app.use('/message', messageRoutes);
app.get('/',(req,res)=>{
    res.send("Hello to naehyung's memories API");
  })

const server = http.createServer(app);
export const io = new Server(server)
socket(io)






const PORT = process.env.PORT || 5002;



mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(PORT, "192.168.0.3", () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => {
    console.log(error.message);
  });
mongoose.set('useFindAndModify', false);



