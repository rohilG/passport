//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface TicketIndexInterface {
  // CONTEXT: ANY
  // Get details for ticket with ticketId
  // Returns: TicketData
  function getTicket(TicketId ticketId) external view returns(TicketData);

  // CONTEXT: ANY
  // Get details for event with eventId
  // Returns: EventData
  function getEvent(EventId eventId) external view returns(EventData);

  // CONTEXT: ANY
  // List all events created by organizer
  // Returns: {TicketId: TicketData, ...}
  function listEventsForOrganizer(address organizerAddress) external view returns(EventDataMap);

  // CONTEXT: ATTENDEE
  // List all tickets owned by calling attendee
  // Returns: {TicketId: TicketData, ...}
  function listTicketsForCaller() external view returns(TicketDataMap);

  // CONTEXT: ORGANIZER
  // List all events created by calling organizer
  // Returns: {EventId: EventData, ...}
  function listEventsForCaller() external view returns(EventDataMap);

  // CONTEXT: ORGANIZER
  // Add event to index corresponding with calling organizer
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
    // Other data columns added here
  }
  struct EventDataMap is mapping(EventId => EventData);


  // We may have to change this to use ticketAddress instead of
  // TicketData and then query the ticket's data on the frontend
  // using ethers. TBD
  type TicketId is string; // Unique identifier hashed from ticket data
  struct TicketData {
    EventData eventData; // Data for the event the ticket belongs to
    address attendeeAddress; // Owner of the ticket
    string floorPrice; // Minimum selling price, set by NFT's owner
  }
  struct TicketDataMap is mapping(TicketId => TicketData);
}
