const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes")
const messagesRoute = require("./routes/messagesRoute")
const socket = require("socket.io");


const app = express();
require('dotenv').config();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET','POST'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoute);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB connection successful");
}).catch((err)=>{
    console.log(err.message);
    console.log(err);
});




const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server Started on Port ${process.env.PORT}`);
});



const io = socket(server,{
    cors:{
        origin:'*',
        credentials: true,
    },
})


global.onlineUsers = new Map();

io.on("connection", (socket)=>{
    global.chatSocket = socket;
    socket.on("add-user", (userId)=>{
        // console.log("sent");
        onlineUsers.set(userId,socket.id);
    })
    socket.on("send-msg", (data)=>{
        const sendUserSocket = onlineUsers.get(data.to);

        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }

    })
})