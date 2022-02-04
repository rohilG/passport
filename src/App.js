import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Verifier from "./views";

function App() {
  const [currentAccount, setCurrentAccount] = useState();

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Verifier />} />
        <Route path="verify" element={<Verifier />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
