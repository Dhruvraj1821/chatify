import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "./models/User.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";


const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

// Create HTTP server
const httpServer = createServer(app);

// Initialize Socket.io
const io = new Server(httpServer, {
    cors: {
        origin: ENV.CLIENT_URL,
        credentials: true,
    },
});

// Store online users
const onlineUsers = new Map(); // userId -> socketId

// Socket.io authentication middleware
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth.token || socket.handshake.headers.cookie?.split('jwt=')[1]?.split(';')[0];
        
        if (!token) {
            return next(new Error("Authentication error: No token provided"));
        }

        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        
        if (!user) {
            return next(new Error("Authentication error: User not found"));
        }

        socket.userId = user._id.toString();
        socket.user = user;
        next();
    } catch (error) {
        next(new Error("Authentication error: Invalid token"));
    }
});

// Socket.io connection handling
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.userId}`);
    
    // Join user to their own room (userId as room name)
    socket.join(socket.userId);
    
    // Add user to online users
    onlineUsers.set(socket.userId, socket.id);
    
    // Emit online users list to all clients
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.userId}`);
        onlineUsers.delete(socket.userId);
        io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });
});

// Make io accessible to other modules
app.set("io", io);

app.use(express.json()); //req.body
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

//make ready for deployment
if(ENV.NODE_ENV=="production"){
    app.use(express.static(path.join(__dirname , "../frontend/dist")));
    app.get("*", (_,res) => {
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));
    })
}

httpServer.listen(PORT, () =>{
    console.log("server running on port : " + PORT);
    connectDB();
})
