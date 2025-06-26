import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PseudoForm() {
  const [pseudo, setPseudo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3001/join", { username: pseudo });
      if (res.status === 200) {
        navigate("/chat", { state: { username: pseudo } });
      }
    } catch (err) {
      setError("Ce pseudo est déjà utilisé.");
    }
  };

  return (
    <div>
      <h2>Choisissez un pseudo</h2>
      <input
        type="text"
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value)}
        placeholder="Pseudo unique"
      />
      <button onClick={handleSubmit}>Rejoindre</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default PseudoForm;
