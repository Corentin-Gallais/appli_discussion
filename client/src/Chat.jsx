import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import "./Chat.css";

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-main">
        <h3 className="chat-title">Salon de Discussion</h3>
        <div className="messages-container">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.user === "Système" ? "system-message" : ""}`}>
              <div>
                <span className="message-user">{m.user}</span>
                <span className="message-timestamp"> [{new Date(m.timestamp).toLocaleTimeString()}]</span>
              </div>
              <div className="message-text">{m.text}</div>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            className="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message..."
          />
          <button className="send-button" onClick={sendMessage}>
            Envoyer
          </button>
        </div>
      </div>
      <div className="users-sidebar">
        <h4 className="users-title">Utilisateurs connectés</h4>
        <ul className="users-list">
          {users.map((u, i) => (
            <li key={i} className="user-item">{u}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Chat;