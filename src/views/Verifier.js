import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import { FcCancel } from "react-icons/fc";
import { Checkmark } from "react-checkmark";
import { useMoralis } from "react-moralis";
import moment from "moment";
import { Audio } from "react-loader-spinner";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

function Verifier() {
  const [attendee_address, set_attendee_address] = useState("");
  const [creator_address, set_creator_address] = useState("");
  const [mint_date, set_mint_date] = useState("");
  const [is_valid_attendee, set_is_valid_attendee] = useState(0);
  const { Moralis } = useMoralis();

  function moralisDateToUnixTimestamp(date_string) {
    return moment(date_string.split(".")[0], "YYYY-MM-DDTHH:mm:ss").unix();
  }

  async function verifyAttendee() {
    const moralis_options = {
      chain: "mumbai",
      address: creator_address,
      limit: "500",
      direction: "to",
    };

    const transfers_to_creator = await Moralis.Web3API.account.getNFTTransfers(
      moralis_options
    );
    console.log("fetched transactions to " + creator_address);

    const nfts_from_attendee = transfers_to_creator.result
      .filter((transaction) => transaction.from_address === attendee_address)
      .map(
        (transaction) => transaction.token_address + " " + transaction.token_id
      );
    console.log(nfts_from_attendee);

    let nfts_minted_by_creator = new Set();
    transfers_to_creator.result
      .filter(
        (transaction) =>
          transaction.from_address ===
            "0x0000000000000000000000000000000000000000" &&
          moralisDateToUnixTimestamp(transaction.block_timestamp) >= mint_date
      )
      .forEach((transaction) =>
        nfts_minted_by_creator.add(
          transaction.token_address + " " + transaction.token_id
        )
      );
    console.log(nfts_minted_by_creator);

    for (const nft of nfts_from_attendee) {
      if (nfts_minted_by_creator.has(nft)) {
        return true;
      }
    }
    return false;
  }

  function handleScan(data) {
    if (data) {
      const received_mac = data.split(" ")[0];
      const attendee_address = data.split(" ")[1];

      console.log(received_mac);
      console.log(attendee_address);
      console.log("heres the secret key", process.env.REACT_APP_SECRET);

      const mac = Base64.stringify(
        hmacSHA512(attendee_address, process.env.REACT_APP_SECRET)
      );

      console.log("got past the mac", mac);

      if (mac === received_mac) {
        set_attendee_address(attendee_address);
      } else {
        console.log(
          "Unable to authenticate wallet address: ",
          attendee_address
        );
      }
    }
  }

  function handleCreatorQRCode(data) {
    if (data) {
      set_creator_address(data.split(" ")[0]);
      set_mint_date(data.split(" ")[1]);
    }
  }

  // Testcase enabled currently with hardcoded addresses
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  useEffect(async () => {
    await timeout(1000);
    set_creator_address("0xeaf54391793cc80de696d72713d7518c6190bfe0");
    // await timeout(1000);
    // set_attendee_address("0x400e4468d737f91984c3f25dc6ac02793b736933");
  }, []);
  // ===================================================

  useEffect(async () => {
    if (attendee_address !== "" && creator_address !== "") {
      console.log("New attendee: ", attendee_address);
      const is_valid_attendee = await verifyAttendee();
      if (is_valid_attendee) {
        set_is_valid_attendee(1);
      } else {
        set_is_valid_attendee(-1);
      }
    }
  }, [attendee_address]);

  useEffect(() => {
    if (creator_address !== "") {
      console.log("Got event initialization: ", creator_address, mint_date);
    }
  }, [creator_address]);

  return (
    <div>
      {/* We generate this only when the artist mints their NFTs, and these QR codes are sent to each verifier */}
      {/* This contains: creator_address + " " + mint_date */}

      {creator_address === "" && (
        <div style={{ padding: "20px 20px" }}>
          <QrReader
            delay={300}
            onScan={handleCreatorQRCode}
            style={{ width: "30%", height: "30%" }}
            onError={(err) => console.log(err)}
          />
        </div>
      )}

      {creator_address && attendee_address === "" && (
        <QrReader
          delay={300}
          onScan={handleScan}
          onError={(err) => console.log(err)}
          style={{ width: "50%", height: "50%" }}
        />
      )}

      {attendee_address !== "" && is_valid_attendee === 0 && (
        <Audio color="#00BFFF" height={80} width={80} />
      )}

      {is_valid_attendee === -1 && <FcCancel />}

      {is_valid_attendee === 1 && <Checkmark />}
    </div>
  );
}

export default Verifier;
