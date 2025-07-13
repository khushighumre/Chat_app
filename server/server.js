// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import http from "http";
// import { connect } from "http2";
// import { connectDB } from "./lib/db.js";
// import userRouter from "./routes/userRoutes.js";
// import messageRouter from "./routes/messageRoutes.js";
// import {Server} from "socket.io";

// // Create Express app and HTTP server
// const app = express();
// const server = http.createServer(app);

// // Initialize socket.io server
// export const io = new Server(server, {
//     cors: {origin: "*"}
// })


// //  Store online users
// export const userSocketMap = {}; 


// // socket.io connection handler
// io.on ("connection", (socket)=> {
//     const userId = socket.handshake.query.userId;
//     console.log("User COnnected", userId);


//     if(userId) userSocketMap[userId] = socket.id;

//     // Emit online users to all connected clients
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));

//     socket.on("disconnect", ()=>{
//         console.log("User disconnected", userId);
//         delete userSocketMap[userId];
//         io.emit("getOnlineUsers", Object.keys(userSocketMap))
//     })
// })

// // Middleware setup
// app.use(express.json({ limit: "4mb" }));
// app.use(cors());

// // Routes setup
// app.use("/api/status", (req,res)=> res.send("sever is live "));
// app.use("/api/auth", userRouter);
// app.use("/api/messages", messageRouter);



// // connect to mongodb
// await connectDB();

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, ()=> console.log(`Server is running on port :`+ PORT));











import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize socket.io server
export const io = new Server(server, {
  cors: {
    origin: "*", // You can replace * with http://localhost:5173 if needed
    credentials: true
  }
});

// ✅ Store mapping of userId → socket.id
export const userSocketMap = {};

// ✅ Helper function to get socketId by userId
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// ✅ Socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    console.log("✅ User connected:", userId);
    userSocketMap[userId] = socket.id;

    // Emit online users to all
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  // ✅ Handle disconnect
  socket.on("disconnect", () => {
    console.log("⚠️ User disconnected:", userId);

    // Clean up only if the socket.id matches
    if (userId && userSocketMap[userId] === socket.id) {
      delete userSocketMap[userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// ✅ Middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// ✅ Routes setup
app.use("/api/status", (req, res) => res.send("Server is live ✅"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// ✅ Connect to MongoDB
await connectDB();

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
