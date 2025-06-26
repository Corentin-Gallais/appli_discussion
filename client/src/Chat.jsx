import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function Chat() {
  const { state } = useLocation();
  const username = state?.username;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!username) return;

    socket.emit("join", username);

    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("notification", (text) => {
      setMessages((prev) => [
        ...prev,
        { user: "Système", text, timestamp: new Date().toISOString() },
      ]);
    });

    socket.on("userList", setUsers);

    return () => {
      socket.disconnect();
    };
  }, [username]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
      <div style={{ flex: 3 }}>
        <h3>Salon</h3>
        <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "1rem" }}>
          {messages.map((m, i) => (
            <div key={i}>
              <strong>{m.user}</strong> [{new Date(m.timestamp).toLocaleTimeString()}]: {m.text}
            </div>
          ))}
        </div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tapez un message"
        />
        <button onClick={sendMessage}>Envoyer</button>
      </div>
      <div style={{ flex: 1 }}>
        <h4>Utilisateurs connectés</h4>
        <ul>
          {users.map((u, i) => (
            <li key={i}>{u}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Chat;
