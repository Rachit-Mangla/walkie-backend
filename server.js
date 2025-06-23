const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// ✅ CORS middleware for Express
app.use(cors({ origin: "https://walkie-frontend.netlify.app" }));

// ✅ CORS config for Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "https://walkie-frontend.netlify.app",
    methods: ["GET", "POST"]
  }
});

app.get("/", (req, res) => {
  res.send("Socket.IO backend running");
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("offer", (data) => socket.broadcast.emit("offer", data));
  socket.on("answer", (data) => socket.broadcast.emit("answer", data));
  socket.on("candidate", (data) => socket.broadcast.emit("candidate", data));

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
