import React from "react";
import { sequence } from "0xsequence";
import { configureLogger } from "@0xsequence/utils";
import { ETHAuth } from "@0xsequence/ethauth";
import QRCode from "react-qr-code";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

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
    try {
      const walletAddress = await this.state.wallet.getAddress();
      console.log("walletAddress", walletAddress);
      const mac = Base64.stringify(
        hmacSHA512(walletAddress, process.env.REACT_APP_SECRET)
      );
      this.setState({ qrString: mac + " " + walletAddress });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const qrString = this.state.qrString;
    return (
      <div>
        <button onClick={() => this.connect(true)}>Connect</button>
        <br />
        <button onClick={() => this.disconnect()}>Disconnect</button>
        <br />
        <button onClick={() => this.signMessage()}>Sign a message</button>
        <br />

        {qrString && <QRCode style={"padding: 20px 20px"} value={qrString} />}
      </div>
    );
  }
}

export default GeneratePubKeyQR;
