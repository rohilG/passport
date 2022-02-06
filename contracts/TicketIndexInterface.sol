//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface TicketIndexInterface {
  // CONTEXT: ANY
  // DESCRIPTION: Get details for ticket with ticketId
  // RETURNS: TicketData
  function getTicket(TicketId ticketId) external view returns(TicketData);

  // CONTEXT: ANY
  // DESCRIPTION: Get details for event with eventId
  // RETURNS: EventData
  function getEvent(EventId eventId) external view returns(EventData);

  // CONTEXT: ANY
  // DESCRIPTION: List all events tracked by indexer
  // TODO: Add a filter parameter
  // RETURNS: {TicketId: TicketData, ...}
  function listEvents() external view returns(EventDataMap);

  // CONTEXT: ANY
  // DESCRIPTION: List all events created by organizer
  // RETURNS: {TicketId: TicketData, ...}
  function listEventsForOrganizer(address organizerAddress) external view returns(EventDataMap);

  // CONTEXT: ATTENDEE
  // DESCRIPTION: List all tickets owned by calling attendee
  // RETURNS: {TicketId: TicketData, ...}
  function listTicketsForCaller() external view returns(TicketDataMap);

  // CONTEXT: ORGANIZER
  // DESCRIPTION: List all events created by calling organizer
  // RETURNS: {EventId: EventData, ...}
  function listEventsForCaller() external view returns(EventDataMap);

  // CONTEXT: ORGANIZER
  // DESCRIPTION: Add event to index corresponding with calling organizer
  // RETURNS: EventId
  function createEventForCaller(EventData eventData) external returns(EventId);

  // CONTEXT: ORGANIZER
  // DESCRIPTION: After an organizer mints ticket NFTs, they need to
  //   call this method to add them to the index
  // REQUIREMENTS:
  // - ticketAddresses contains only addresses pointing to a ticket
  //     NFT minted by the caller's address
  // - eventId tracked by TicketIndex and belonging to calling organizer
  function addTicketsToIndexForCaller(address[] ticketAddresses, EventId eventId) external;


  type EventId is string; // Unique identifier hashed from event data
  struct EventData {
    address organizerAddress; // Minter of ticket NFTs for event
    uint256 numMintedTickets; // Number of ticket NFTs minted for event
    uint256 startDatetime; // Datetime of the event start time - see https://ethereum.stackexchange.com/questions/32173/how-to-handle-dates-in-solidity-and-web3
    string venueName;
    string eventName;
  }
  struct EventDataMap is mapping(EventId => EventData);


  // We may have to change this to use ticketAddress instead of
  // TicketData and then query the ticket's data on the frontend
  // using ethers. TBD
  type TicketId is string; // Unique identifier hashed from ticket data
  struct TicketData {
    EventData eventData; // Data for the event the ticket belongs to
    address attendeeAddress; // Owner of the ticket
    string price; // Price of ticket, set by NFT's owner
  }
  struct TicketDataMap is mapping(TicketId => TicketData);
}
