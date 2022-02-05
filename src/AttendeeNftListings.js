import AccountContext from './AccountContext';
import {useState, useContext, useEffect} from 'react';
import axios from 'axios';

function AttendeeNftListings() {
    

    const account = useContext(AccountContext);
    const axios = require('axios');

    const nft_port_api_key = process.env.REACT_APP_NFT_PORT_API_KEY;
    console.log(nft_port_api_key);

    const [nftList, setNftList] = useState([]);

    async function fetchNftForAddress () {
        const options = {
            method: 'GET',
            url: `https://api.nftport.xyz/v0/accounts/${account.publicKey}`,
            params: {chain: 'polygon'},
            headers: {
              'Content-Type': 'application/json',
              Authorization: nft_port_api_key,
            }
          };
          
          axios.request(options).then(function (response) {
            setNftList(response.data.nfts);
          }).catch(function (error) {
            console.error(error);
          });
        
    }

    useEffect(() => {
        fetchNftForAddress();
        console.log(nftList, "nftList");
    }, []);

    return (
        <div>
            List all Nfts {account.publicKey}
        </div>
    );
}

export default AttendeeNftListings;