import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PseudoForm from "./PseudoForm";
import Chat from "./Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PseudoForm />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
