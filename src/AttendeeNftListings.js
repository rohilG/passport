import AccountContext from './AccountContext';
import {useState, useContext, useEffect} from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import NftCard from './NftCard';

function AttendeeNftListings() {
    

    const account = useContext(AccountContext);

    // const nft_port_api_key = process.env.REACT_APP_NFT_PORT_API_KEY;
    // console.log(nft_port_api_key);

    let count = 0;
    const [nftList, setNftList] = useState([]);
    const {isAuthenticated, Moralis} = useMoralis();
    const verification = {appId: "ICYNGMsC7ru5DREZVwoWjX39UcYQo34HAsAIOQHo", serverUrl: "https://hxzbhq0gqxph.usemoralis.com:2053/server"};

    async function fetchNftForAddress() {
      Moralis.start(verification);
      const chain = 'polygon'
      const params = { chain: chain, address: account.publicKey};
      console.log("aids");

      const nfts = await Moralis.Web3API.account.getNFTs(params);
      setNftList(nfts.result);
    }

    // fixURL = (url) => {
    //   if (url.startsWith("ipfs")) {
    //     return "https://ipfs.moralis.io:2053/ipfs/" + url.split("ipfs://ipfs/")[1];
    //   } else {
    //     return url + "?format=json";
    //   }
    // }

    useEffect(() => {
      fetchNftForAddress();
    }, [account.publicKey]);

    return (
        <div>
          {nftList.map((nftData, id) => (
              <div className="flex flex-wrap ">
                <NftCard
                key={id}
                nftData={nftData}
                title={"Random Name"}
              />
              </div>          
          ))}
        </div>
    );
}

export default AttendeeNftListings;