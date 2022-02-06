import React from "react";
// import TextField from "@mui/material/TextField";
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useMoralis } from "react-moralis";

function EventCreateModal() {
  const { Moralis } = useMoralis();
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [numTickets, setNumTickets] = useState("");

  async function createNFTs() {
    console.log("about to create some nfts");
    console.log("heres the values we're going to work with:");
    console.log("eventName", eventName);
    console.log("location", location);
    console.log("dateTime", dateTime);
    console.log("numTickets", numTickets);

    const options = {
      abi: [
        {
          path: "website-logo.jpg",
          content:
            "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3",
        },
      ],
    };

    const path = await Moralis.Web3API.storage.uploadFolder(options);

    console.log("path", path);
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

        <div className="hidden sm:block">
          <button
            onClick={() => createNFTs()}
            className="mr-1 h-8 mb-3 border border-blue-700 px-3 text-sm font-bold text-blue-700 hover:bg-blue-700 hover:text-white"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCreateModal;
