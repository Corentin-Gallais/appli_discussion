import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PseudoForm.css";

function PseudoForm() {
  const [pseudo, setPseudo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!pseudo.trim()) {
      setError("Arrête tes conneries, mets un pseudo valide.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:3001/join", { username: pseudo });
      if (res.status === 200) {
        navigate("/chat", { state: { username: pseudo } });
      }
    } catch (err) {
      setError("Ce pseudo est déjà pris, trouve autre chose mon reuf.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="pseudo-container">
      <div className="pseudo-card">
        <div className="pseudo-header">
          <h2 className="pseudo-title">Rejoindre le Chat</h2>
          <p className="pseudo-subtitle">Choisis ton pseudo et lance-toi dans l'aventure</p>
        </div>
        
        <div className="pseudo-form">
          <div className="input-group">
            <input
              type="text"
              className="pseudo-input"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ton pseudo unique..."
              disabled={loading}
            />
            <button 
              className={`join-button ${loading ? 'loading' : ''}`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                "Rejoindre"
              )}
            </button>
          </div>
          
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PseudoForm;