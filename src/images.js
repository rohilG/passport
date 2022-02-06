let fs = require("fs");
let axios = require("axios");
// import { useMoralis } from "react-moralis";

let ipfsArray = [];
let promises = [];

for (let i = 0; i < 1; i++) {
  let paddedHex = (
    "0000000000000000000000000000000000000000000000000000000000000000" +
    i.toString(16)
  ).substr("-64");

  promises.push(
    new Promise((res, rej) => {
      fs.readFile(`website-logo.jpg`, (err, data) => {
        if (err) {
          console.log("nope");
          rej();
        }

        ipfsArray.push({
          path: `website-logo.jpg`,
          content: data.toString("base64"),
        });

        res();
      });
    })
  );
}

Promise.all(promises).then(() => {
  console.log("ipfsArray", ipfsArray);

  // const options = {
  //   abi: [
  //     {
  //       path: "images/0000000000000000000000000000000000000000000000000000000000000000.png",
  //       content:
  //         "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3",
  //     },
  //   ],
  // };
  // const path = await Moralis.Web3API.storage.uploadFolder(options);

  axios
    .post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, {
      headers: {
        "X-API-KEY": "iMJDo8q2soXtclYVOp5Qi7Y7ag94rqSo27uM9F22",
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
});
