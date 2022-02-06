//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface TicketIndexInterface {
  function getTicket(TicketId ticketId) external view returns(TicketData) {};

  function getEvent(EventId eventId) external view returns(EventData) {};

  function listEvents() external view returns(EventDataMap) {};

  function listEventsForOrganizer(address organizerAddress) external view returns(EventDataMap) {};

  function listTicketsForCaller() external view returns(TicketDataMap) {};

  function listEventsForCaller() external view returns(EventDataMap) {};

  function createEventForCaller(EventData eventData) external returns(EventId) {};

  function addTicketsToIndexForCaller(address[] ticketAddresses, EventId eventId) external {};


  type EventId is string; // Unique identifier hashed from event data
  struct EventData {
    address organizerAddress; // Minter of ticket NFTs for event
    uint256 numMintedTickets; // Number of ticket NFTs minted for event
    uint256 startDatetime; // Datetime of the event start time - see https://ethereum.stackexchange.com/questions/32173/how-to-handle-dates-in-solidity-and-web3
    string venueName;
    string eventName;
  }
  struct EventDataMap is mapping(EventId => EventData);

  type TicketId is string; // Unique identifier hashed from ticket data
  struct TicketData {
    EventData eventData; // Data for the event the ticket belongs to
    address attendeeAddress; // Owner of the ticket
    string price; // Price of ticket, set by NFT's owner
  }
  struct TicketDataMap is mapping(TicketId => TicketData);
}
