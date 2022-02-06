import { Route, Switch, useLocation } from "react-router-dom";
import AttendeeNftListings from "./AttendeeNftListings";
import EventCreateModal from "./EventCreateModal";
import EventListings from "./EventListings";
import TicketPurchase from "./TicketPurchase";
import Verifier from "./views/Verifier";
import GeneratePubKeyQR from "./views/GeneratePubKeyQR";

function RoutingSwitch() {
  let location = useLocation();

  return (
    <Switch location={location}>
      <Route exact path="/" component={EventListings} />
      <Route exact path="/attendee/wallet" component={AttendeeNftListings} />
      <Route exact path="/attendee/tickets/:event_id" component={TicketPurchase} />
      <Route exact path="/artist/create/event" component={EventCreateModal} />
      <Route exact path="/verify" component={Verifier} />
      <Route exact path="/attendee/qr" component={GeneratePubKeyQR} />
    </Switch>
  );
}

export default RoutingSwitch;
