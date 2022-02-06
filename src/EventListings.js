
import Venue from "./venue.jpg";

function EventListings() {
    return (
        <div class="w-full border-r justify-center pl-20 pr-20"  >
            <div class="px-3">
                <div class="mt-2 rounded-lg ">
                    <div class="text-lg font-extrabold text-gray-900 p-3">Events you might like</div>
                    <div class="p-3 flex items-center justify-between border-t">
                        <div class="flex items-center">
                            <img class="h-10 w-10" src={Venue} />
                            <div class="ml-2 flex flex-col">
                                <div class="leading-snug text-sm text-gray-900 font-bold">Feb 14</div>
                                <div class="leading-snug text-xs text-gray-600">10 AM</div>
                            </div>
                        </div>
                        <div class="flex items-center flex-col">
                            <div className="font-extrabold">
                                Event Location
                            </div>
                            <div className="">
                                Event Name - Artist
                            </div>
                        </div>
                        <button class="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 hover:bg-blue-100">Tickets</button>
                    </div>

                    <div class="p-3 flex items-center justify-between border-t">
                        <div class="flex items-center">
                            <img class="h-10 w-10" src={Venue} />
                            <div class="ml-2 flex flex-col">
                                <div class="leading-snug text-sm text-gray-900 font-bold">Feb 14</div>
                                <div class="leading-snug text-xs text-gray-600">10 AM</div>
                            </div>
                        </div>
                        <div class="flex items-center flex-col">
                            <div className="font-extrabold">
                                Event Location
                            </div>
                            <div className="">
                                Event Name - Artist
                            </div>
                        </div>
                        <button class="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 hover:bg-blue-100">Tickets</button>
                    </div>
                    <div class="p-3 flex items-center justify-between border-t">
                        <div class="flex items-center">
                            <img class="h-10 w-10" src={Venue} />
                            <div class="ml-2 flex flex-col">
                                <div class="leading-snug text-sm text-gray-900 font-bold">Feb 14</div>
                                <div class="leading-snug text-xs text-gray-600">10 AM</div>
                            </div>
                        </div>
                        <div class="flex items-center flex-col">
                            <div className="font-extrabold">
                                Event Location
                            </div>
                            <div className="">
                                Event Name - Artist
                            </div>
                        </div>
                        <button class="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 hover:bg-blue-100">Tickets</button>
                    </div>

                </div>
            </div>
        </div>
        
        
    );
}

export default EventListings;