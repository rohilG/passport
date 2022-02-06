// import React from "react";
// import { useMoralis } from "react-moralis";

// class GenerateNFTs extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       moralis: null,
//     };
//   }

//   componentDidMount() {
//     this.setState({ moralis: useMoralis() });
//   }

//   useEffect(async () => {
//     const appId = "iMJDo8q2soXtclYVOp5Qi7Y7ag94rqSo27uM9F22";
//     const serverUrl = "https://ajly5xpy5zyk.usemoralis.com:2053/server";
//     Moralis.start({ serverUrl, appId });

//     const options = {
//       abi: [
//         {
//           path: "../website-logo.jpg",
//           content:
//             "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3",
//         },
//       ],
//     };

//     const path = await Moralis.Web3API.storage.uploadFolder(options);

//     console.log("path", path);
//   }, []);

//   render() {
//     return <div></div>;
//   }
// }

// export default GenerateNFTs;
