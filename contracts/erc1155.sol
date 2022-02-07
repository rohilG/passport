// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BulkMint is Ownable, ERC1155 {

    string public name;
    uint256 eventId;

    constructor() ERC1155("https://ipfs.moralis.io:2053/ipfs/QmRnGUX6FTkr7pu2MyysJhCCMDwu9T3bhq9KD86kvVA7Db/"){
        setName("NFT Collection");
    }

    function setURI(string memory _newuri) public onlyOwner {
        _setURI(_newuri);
    }

    function setName(string memory _name) public onlyOwner {
        name = _name;
    }

    function bulkMint(string memory _name, uint256 numTicket, string memory ipfsHash) public {
        setName(_name);
        setURI(ipfsHash);

        uint256[] memory eventIds = new uint[](1);
        eventIds[0] = eventId;

        uint256[] memory numTickets = new uint[](1);
        numTickets[0] = numTicket;
        
        mintBatch(msg.sender, eventIds, numTickets);
        eventId += 1;
    }

    function mintBatch(address addr, uint256[] memory ids, uint256[] memory numTickets)
        public
        onlyOwner
    {
        _mintBatch(addr, ids, numTickets, '');
    }

    function mint(uint256 id, uint256 amount) public onlyOwner {
        _mint(msg.sender, id, amount, '');
    }
}