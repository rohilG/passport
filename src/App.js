import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";
import AccountContext from "./AccountContext";
import AuthModalContext from "./AuthModalContext";
import AuthModal from "./AuthModal";
import RoutingSwitch from "./RoutingSwitch";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <AuthModalContext.Provider
      value={{ show: showAuthModal, setShow: setShowAuthModal }}
    >
      <AccountContext.Provider
        value={{ publicKey: currentAccount, setPublicKey: setCurrentAccount }}
      >
        <Router>
          <Header />
          <AuthModal />
          <RoutingSwitch />
        </Router>
      </AccountContext.Provider>
    </AuthModalContext.Provider>
  );
}

export default App;
