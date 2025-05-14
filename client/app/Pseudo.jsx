import React, { useState } from 'react';

export default function Pseudo({ onSetPseudo }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sessionStorage.setItem('pseudo', input);
      onSetPseudo(input);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Entrez votre pseudo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Entrer</button>
    </form>
  );
}