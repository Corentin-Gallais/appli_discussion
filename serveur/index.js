const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

const users = new Map();

app.post("/join", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Pseudo requis" });

  const isTaken = Array.from(users.values()).includes(username);
  if (isTaken) return res.status(409).json({ error: "Pseudo déjà pris" });

  res.status(200).json({ message: "Pseudo accepté" });
});

io.on("connection", (socket) => {
  socket.on("join", (username) => {
    users.set(socket.id, username);
    io.emit("userList", Array.from(users.values()));
    socket.broadcast.emit("notification", `${username} a rejoint le salon`);
  });

  socket.on("message", (msg) => {
    const username = users.get(socket.id);
    const timestamp = new Date().toISOString();
    io.emit("message", { user: username, text: msg, timestamp });
  });

  socket.on("disconnect", () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    io.emit("userList", Array.from(users.values()));
    if (username) io.emit("notification", `${username} a quitté le salon`);
  });
});

server.listen(3001, () => {
  console.log("Serveur en écoute sur http://localhost:3001");
});