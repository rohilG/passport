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
      qrString: "",
      wallet: null,
    };
  }

  // componentDidMount() {
  //   this.setState({ wallet: new sequence.Wallet(this.state.network) });
  // }

  connect = async (authorize) => {
    const wallet = new sequence.Wallet("polygon");

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
    this.setState({ wallet: wallet });
  };

  disconnect = () => {
    this.state.wallet.disconnect();
    this.setState({ wallet: null });
  };

  signMessage = async () => {
    try {
      const walletAddress = await this.state.wallet.getAddress();
      console.log("walletAddress", walletAddress);
      const mac = Base64.stringify(
        hmacSHA512(
          walletAddress,
          "$6$cOI4DEn.8we9k/.d$nP/Sizp33fW5SVyqVwm8CSYVPywHfkJuUnfQ1m/f20bGDLPcChz5AL/N0d2jqnsiJvl/xYxaV8rIfVpGkFmDM0"
        )
      );
      this.setState({ qrString: mac + " " + walletAddress });
    } catch (err) {
      this.setState({ wallet: null });
      console.log(err);
    }
  };

  render() {
    const qrString = this.state.qrString;
    return (
      <div>
        <div className="flex justify-center space-x-5">
          <button
            onClick={() => this.connect(true)}
            className="mr-1 h-8 border border-blue-700 rounded-full px-3 text-sm font-bold text-blue-700 hover:bg-blue-700 hover:text-white disabled:opacity-50"
            disabled={this.state.wallet}
          >
            Connect
          </button>
          <button
            onClick={() => this.disconnect()}
            className="mr-1 h-8 border border-blue-700 rounded-full px-3 text-sm font-bold text-blue-700 hover:bg-blue-700 hover:text-white disabled:opacity-50"
            disabled={!this.state.wallet}
          >
            Disconnect
          </button>
          <button
            onClick={() => this.signMessage()}
            className="mr-1 h-8 border border-blue-700 rounded-full px-3 text-sm font-bold text-blue-700 hover:bg-blue-700 hover:text-white disabled:opacity-50"
            disabled={!this.state.wallet || this.state.qrString !== ""}
          >
            Sign QR
          </button>
        </div>
        <br />
        <div className="flex justify-center">
          {qrString && <QRCode value={qrString} />}
        </div>
      </div>
    );
  }
}

export default GeneratePubKeyQR;
