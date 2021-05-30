import React from "react";

import TicketsList from "../features/tickets/TicketsList";

export default function LandingPage({ user }) {
  return (
    user && (
      <>
        <div className="d-flex ml-3 mt-1">
          <h5>
            <>
              Hello{" "}
              <span className="text-primary">{`${user.firstName} ${user.lastName}`}</span>
            </>
          </h5>
        </div>

        <h3 className="mt-2">Home page</h3>
        <div className="container">
          <div className="row justify-content-center">
            <TicketsList />
          </div>
        </div>
      </>
    )
  );
}
