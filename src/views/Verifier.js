import React from "react";
import QrReader from "react-qr-reader";
import QRCode from "react-qr-code";
// import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { FcCancel, FcTouchscreenSmartphone } from "react-icons/fc";
import { Checkmark } from "react-checkmark";
import { padding } from "@mui/system";
import axios from "axios";

class Verifier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendee_addr: "",
      creator_addr: "",
      dataCollectionStep: 0,
      mintDate: "",
      isValidAttendee: false,
    };
  }

  async verifyAttendee() {
    const nft_port_api_key = "cb0130f1-d009-4f9d-9f5b-f9c6471ebf38";
    const moralis_api_key =
      "gxpDcsiOxjhx1SvF5ROBiMVeeGsQ9WtZSo9mDB1nWpNf9hnd4aOpzU91A2jABQi0";
    // const { initialize, isInitialized } = useMoralis();
    // initialize({
    //   appId: "ICYNGMsC7ru5DREZVwoWjX39UcYQo34HAsAIOQHo",
    //   serverUrl: "https://hxzbhq0gqxph.usemoralis.com:2053/server",
    // });
    const nftport_instance = axios.create({
      baseURL: "https://api.nftport.xyz/v0/",
      headers: {
        Authorization: nft_port_api_key,
        "Content-Type": "application/json",
      },
    });

    const response = await nftport_instance.get(
      `accounts/${this.state.creator_addr}?chain=ethereum`
    );
    if (!response.ok) {
      console.log("Network response not OK!");
    }
    const creator_minted_held_nfts = response.data.nfts
      .filter((nft) => nft.creator_address === this.state.creator_addr)
      .map((nft) => [nft.contract_address, nft.token_id]);
    console.log(creator_minted_held_nfts);

    // fetch(
    //   `https://deep-index.moralis.io/api/v2/nft/${this.state.attendee_addr}/transfers?chain=eth&format=decimal&direction=from`,
    //   { moralis_headers }
    // )
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response not OK!");
    //     }
    //     response.json();
    //   })
    //   .then((data) => {
    //     const attendee_sent_nfts = data["result"]
    //       .filter((nft) => (nft["to_address"] === this.state.creator_addr && creator_held_nfts.includes([nft["token_address"], nft["token_id"]])));
    //   })
    //   .catch((error) => {
    //     return false;
    //   });

    // attendee_sent_nfts.forEach((nft) => fetch(
    //   `https://api.nftport.xyz/v0/nfts/${nft[0]}/${nft[1]}?chain=ethereum`,
    //   { moralis_headers }
    // )
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response not OK!");
    //     }
    //     response.json();
    //   })
    //   .then((data) => {
    //     if (data["nft"]["mint_date"] === this.state.mintDate) {
    //       return true;
    //     }
    //   })
    //   .catch((error) => {
    //     return false;
    //   })
    // )
    // return false;

    return true;
    // const Web3Api = useMoralisWeb3Api();
    // const options = {
    //   chain: "eth",
    //   address: attendee_addr,
    //   limit: "10",
    //   direction: "from",
    // };
    // const transfersNFT = await Web3API.account.getNFTTransfers(options);
  }

  handleScan = (data) => {
    if (data) {
      console.log("data: ", data.split(":")[1]);

      this.setState({ attendee_addr: data.split(":")[1] });

      console.log(this.state.attendee_addr);
      console.log(this.state.creator_addr);

      const isValidAttendee = this.verifyAttendee();

      console.log("isValidAttendee", isValidAttendee);

      this.setState({
        dataCollectionStep: 2,
        isValidAttendee: isValidAttendee,
      });
    }
  };

  handleCreatorQRCode = (data) => {
    if (data) {
      alert("got some data", data);
      this.setState({
        creator_addr: data.split(" ")[0],
        mintDate: data.split(" ")[1],
        dataCollectionStep: 1,
      });
    }
  };

  // Debug only
  componentDidMount() {
    this.setState(
      { creator_addr: "0xbbaef1cf314755f3182fb8388061da3cf8724fee" },
      () => {
        this.verifyAttendee();
      }
    );
  }

  render() {
    const { dataCollectionStep, attendee_addr, creator_addr, isValidAttendee } =
      this.state;
    return (
      <div>
        {/* We generate this only when the artist mints their NFTs, and these QR codes are sent to each verifier */}
        {/* This contains: creator_address + " " + mint_date */}

        {dataCollectionStep === 0 && (
          <div style={{ padding: "20px 20px" }}>
            <QRCode value="0x1494bb40e35DF00afce4dd01Fe67d5eB1eA6AED6 2020-10-29T15:03:54.838612" />
            <br />
            {console.log("step 0")}

            <QrReader
              delay={300}
              onScan={this.handleCreatorQRCode}
              style={{ width: "30%", height: "30%" }}
              onError={(err) => console.log(err)}
            />
          </div>
        )}

        {/* {this.state.dataCollectionStep === 1 && (
          <form onSubmit={this.handleSubmit}>
            <label for="fname">Artist Creator:</label>
            <br />
            <input
              type="text"
              value={this.state.creator_addr}
              onChange={this.handleChange}
            />
          </form>
          <QrReader
            delay={300}
            onScan={this.handleScan}
            style={{ width: "50%", height: "50%" }}
            onError={ (err) => console.log(err) }
          />
        )}
        */}

        {dataCollectionStep === 1 && (
          <QrReader
            delay={300}
            onScan={this.handleScan}
            onError={(err) => console.log(err)}
            style={{ width: "50%", height: "50%" }}
          />
        )}

        {dataCollectionStep === 2 &&
          !isValidAttendee && <FcCancel /> &&
          this.setState({ dataCollectionStep: 0 })}

        {dataCollectionStep === 2 &&
          isValidAttendee && <Checkmark /> &&
          this.setState({ dataCollectionStep: 0 })}
      </div>
    );
  }
}

export default Verifier;
