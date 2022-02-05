import React from "react";
import { sequence } from "0xsequence";
import { configureLogger } from "@0xsequence/utils";
import { ETHAuth } from "@0xsequence/ethauth";
import QRCode from "react-qr-code";

configureLogger({ logLevel: "ERROR" });

class GeneratePubKeyQR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      network: "polygon",
      qrString: "",
    };
  }

  componentDidMount() {
    this.setState({ wallet: new sequence.Wallet(this.state.network) });
  }

  connect = async (authorize) => {
    const wallet = this.state.wallet;

    const connectDetails = await wallet.connect({
      app: "passport",
      authorize,
      keepWalletOpened: true,
    });

    if (authorize) {
      const ethAuth = new ETHAuth();

      if (connectDetails.proof) {
        const decodedProof = await ethAuth.decodeProof(
          connectDetails.proof.proofString,
          true
        );

        const isValid = await wallet.utils.isValidTypedDataSignature(
          await wallet.getAddress(),
          connectDetails.proof.typedData,
          decodedProof.signature,
          await wallet.getAuthChainId()
        );

        if (!isValid) throw new Error("sig invalid");
      }
    }
  };

  disconnect = () => {
    this.state.wallet.disconnect();
  };

  signMessage = async () => {
    const wallet = this.state.wallet;
    const walletAddress = await wallet.getAddress();
    const signer = wallet.getSigner();
    const chainID = await signer.getChainId();

    console.log("walletAddress", walletAddress);
    console.log("chainID", chainID);

    // sign
    const sig = await signer.signMessage(walletAddress);

    this.setState({ qrString: sig + " " + walletAddress + " " + chainID });

    // validate
    // const isValid = await wallet.utils.isValidMessageSignature(
    //   walletAddress,
    //   walletAddress,
    //   sig,
    //   await signer.getChainId()
    // );
    // console.log("isValid?", isValid);
    // if (!isValid) throw new Error("sig invalid");
  };

  render() {
    const qrString = this.state.qrString;
    return (
      <div>
        <button onClick={() => this.connect(true)}>Connect</button>
        <button onClick={() => this.disconnect()}>Disconnect</button>
        <button onClick={() => this.signMessage()}>Sign a message</button>

        {qrString && <QRCode value={qrString} />}
      </div>
    );
  }
}

export default GeneratePubKeyQR;
