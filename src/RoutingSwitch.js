import { Route, Switch, useLocation } from "react-router-dom";
import AttendeeNftListings from "./AttendeeNftListings";
import EventCreateModal from "./EventCreateModal";
import EventListings from "./EventListings";
import TicketPurchase from "./TicketPurchase";
import Verifier from "./views/Verifier";
import GeneratePubKeyQR from "./views/GeneratePubKeyQR";
import GenerateNFTs from "./views/GenerateNFTs";

function RoutingSwitch() {
  let location = useLocation();

  return (
    <Switch location={location}>
      <Route exact path="/" component={EventListings} />
      <Route exact path="/artist/create/event" component={EventCreateModal} />
      <Route exact path="/artist/generate" component={GenerateNFTs} />
      <Route exact path="/attendee/wallet" component={AttendeeNftListings} />
      <Route
        exact
        path="/attendee/tickets/:event_id"
        component={TicketPurchase}
      />
      <Route exact path="/attendee/qr" component={GeneratePubKeyQR} />
      <Route exact path="/verify" component={Verifier} />
    </Switch>
  );
}

export default RoutingSwitch;
