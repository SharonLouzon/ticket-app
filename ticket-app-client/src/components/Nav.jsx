import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { logoutUser, selectUser } from "../features/user/userSlice";
import { resetTickets } from "../features/tickets/ticketsSlice";

export default function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await dispatch(logoutUser());
    dispatch(resetTickets());
    setLoading(false);
  };

  useEffect(() => {
    if (!user) history.push("/login");
  }, [user, history]);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  });

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="d-flex justify-content-between w-100">
        <div
          className="navbar-brand text-primary font-weight-bold btn m-0 p-0"
          onClick={() => {
            if (history.location.pathname !== "/") history.push("/");
          }}
        >
          Tickets App
        </div>
        {/* <Link className="navbar-brand text-primary font-weight-bold" to="/">
        </Link> */}
        <div>
          <button
            className="btn btn-outline-primary round-btn"
            onClick={() => handleLogout()}
            disabled={loading}
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}
