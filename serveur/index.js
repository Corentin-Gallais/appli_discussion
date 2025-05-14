const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

let users = new Map();

io.on("connection", (socket) => {
  socket.on("new-user", (pseudo) => {
    users.set(socket.id, pseudo);
  });

  socket.on("send-message", ({ pseudo, message }) => {
    io.emit("chat-message", { pseudo, message });
  });

  socket.on("disconnect", () => {
    users.delete(socket.id);
  });
});

server.listen(3001, () => console.log("Serveur WebSocket en écoute sur le port 3001"));