import { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import AttendeeNftListings from "./AttendeeNftListings";
import EventListings from "./EventListings";
import Verifier from "./views/Verifier";

function RoutingSwitch() {
  let location = useLocation();

  return (
    <Switch location={location}>
      <Route exact path="/" component={EventListings} />
      <Route exact path="/attendee/wallet" component={AttendeeNftListings} />
      <Route path="/verify" component={Verifier} />
    </Switch>
  );
}

export default RoutingSwitch;
