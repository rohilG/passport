import React from "react";
// import TextField from "@mui/material/TextField";
import { useState, useContext } from "react";
import DateTimePicker from "react-datetime-picker";
import { useMoralis } from "react-moralis";
import { Audio } from "react-loader-spinner";
import { sequence } from "0xsequence";
import { ETHAuth } from "@0xsequence/ethauth";
import { ethers } from "ethers";
import abi from "./utils/BulkMint.json";
import AccountContext from "./AccountContext";
import moment from "moment";
import QRCode from "react-qr-code";

function EventCreateModal() {
  const { Moralis } = useMoralis();
  const [selectedFile, setSelectedFile] = useState(null);
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [numTickets, setNumTickets] = useState("");
  const [eventQR, setEventQR] = useState("");
  const [waitForMint, setWaitForMint] = useState(false);
  const account = useContext(AccountContext);
  // const [ticketPrice, setTicketPrice] = useState(0);

  // This function will be called numTickets time
  // TODO: Add ipfsHashs into params and pass it into ERC1155 contract

  // Mints one NFT

  const contractABI = abi.abi;

  async function mint(metaDataIPFSHash) {
    try {
      console.log("in mint");

      const { ethereum } = window;

      if (ethereum) {
        const contractAddress = "0x544635452b3B97A80cbADa0F8983131deAF1ef6f";
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const bulkMintFactory = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("metaDataIPFSHash", metaDataIPFSHash);
        console.log("contractABI", contractABI);

        const minting = await bulkMintFactory.bulkMint(
          eventName,
          numTickets,
          metaDataIPFSHash
        );

        console.log("Mining...", minting.hash);

        await minting.wait();
        console.log("Mined -- ", minting.hash);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createNFTs() {
    if (!account.publicKey) {
      alert("Log In with MetaMask!");
      return;
    }
    const mintDate = moment().format("YYYY-MM-DDTHH:mm:ss");
    const qrString = account.publicKey + " " + mintDate;
    setEventQR(qrString);
    console.log(qrString);

    const serverUrl = "https://ajly5xpy5zyk.usemoralis.com:2053/server";
    const appId = "iMJDo8q2soXtclYVOp5Qi7Y7ag94rqSo27uM9F22";
    Moralis.start({ serverUrl, appId });

    console.log("about to create some nfts");
    console.log("heres the values we're going to work with:");
    console.log("selectedFile:", selectedFile);
    console.log("eventName", eventName);
    console.log("location", location);
    console.log("dateTime", dateTime);
    console.log("numTickets", numTickets);
    // console.log("ticketPrice", ticketPrice);

    // encode the file using the FileReader API

    const reader = new FileReader();
    let base64String;
    let moralisFile;
    let metaDataIPFSHash;

    // Upload the NFT image to IPFS
    reader.onloadend = async () => {
      // use a regex to remove data url part
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

      let options = {
        abi: [
          {
            path: "images.png",
            content: base64String,
          },
        ],
      };

      let path = await Moralis.Web3API.storage.uploadFolder(options);

      console.log("image path", path);

      const content = {
        image: path[0].path,
        name: eventName,
        description: `This event is hosted at ${location}, at date/time ${dateTime}.\nThere's only ${numTickets} total, buy yours soon!`,
      };

      options = {
        abi: [
          {
            path: "metadata.json",
            content: content,
          },
        ],
      };

      metaDataIPFSHash = await Moralis.Web3API.storage.uploadFolder(options);

      console.log("metadata", metaDataIPFSHash);

      setWaitForMint(true);
      await mint(metaDataIPFSHash[0].path);
      setWaitForMint(false);
    };
    reader.readAsDataURL(selectedFile);
  }

  return (
    <div className="pl-20 pr-20 mb-5">
      <div className="w-full border-r justify-center pl-5 rounded-lg shadow-xl">
        <h1 className="text-3xl mb-3 font-bold">Create Event</h1>
        <h1 className="text-lg font-semibold mb-3">Upload Ticket Image</h1>
        <h1 className="text-sm font-medium text-gray-400 mb-5">
          File types supposed: JPG, PNG, SVG. Max size: 100 MB
        </h1>

        <div className="mb-3 w-96">
          <input
            className="form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            id="formFile"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </div>

        <div className="mb-3 w-96">
          <label
            className="text-sm font-medium text-gray-400 mb-5"
            for="Event Name"
          >
            Event Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nftname"
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <div className="mb-3 w-96">
          <label
            className="text-sm font-medium text-gray-400 mb-5"
            for="Venue Location"
          >
            Venue Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="venue"
            type="text"
            placeholder="Venue Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="mb-3 w-96">
          <label
            className="text-sm font-medium text-gray-400 mb-5"
            for="Date & Time"
          >
            Date & Time
          </label>
          <DateTimePicker
            className="shadow appearance-none border rounded w-full mt-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={dateTime}
            onChange={setDateTime}
          />
        </div>

        <div className="mb-3 w-96">
          <label
            className="text-sm font-medium text-gray-400 mb-5"
            for="Number of Tickets"
          >
            Number of Tickets to be Issued
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ticketcap"
            type="number"
            placeholder="8"
            value={numTickets}
            onChange={(e) => setNumTickets(e.target.value)}
          />
        </div>

        {/* <div className="mb-3 w-96">
          <label
            className="text-sm font-medium text-gray-400 mb-5"
            for="Ticket Price"
          >
            Ticket Price ($USD)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ticketPrice"
            type="number"
            placeholder="20"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
          />
        </div> */}

        <div className="hidden sm:block">
          <button
            onClick={() => createNFTs()}
            className="mr-1 h-8 mb-3 border border-blue-700 px-3 text-sm font-bold text-blue-700 hover:bg-blue-700 hover:text-white"
          >
            Create Event
          </button>
        </div>
        {waitForMint && (
          <div className="flex justify-left py-5">
            <Audio color="blue" height={80} width={80} />
          </div>
        )}
        <div className="flex justify-left py-5">
          {eventQR && <QRCode value={eventQR} />}
        </div>
      </div>
    </div>
  );
}

export default EventCreateModal;
