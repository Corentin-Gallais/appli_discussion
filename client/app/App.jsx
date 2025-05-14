import React, { useState } from 'react';
import PseudoForm from './PseudoForm';
import Chat from './Chat';

export default function App() {
  const [pseudo, setPseudo] = useState(sessionStorage.getItem('pseudo'));

  return (
    <div>
      {!pseudo ? (
        <PseudoForm onSetPseudo={setPseudo} />
      ) : (
        <Chat pseudo={pseudo} />
      )}
    </div>
  );
}
