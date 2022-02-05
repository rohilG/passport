import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Verifier from "./views/Verifier";
import GeneratePubKeyQR from "./views/GeneratePubKeyQR";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Verifier />} />
        <Route path="verify" element={<Verifier />} />
        <Route path="pubkeyproof" element={<GeneratePubKeyQR />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
