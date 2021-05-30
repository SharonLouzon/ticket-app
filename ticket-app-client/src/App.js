import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUser } from "./features/user/userSlice";

import ProtectedRoute from "./ProtectedRoute";

import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import TicketEdit from "./features/tickets/ticketEdit/TicketEdit";
import Login from "./features/user/Login";
import Signup from "./features/user/Signup";
import TicketView from "./features/tickets/TicketView";

function App() {
  const user = useSelector(selectUser);
  return (
    <Router>
      <div className="App">
        {user && <Nav />}
        <Switch>
          {!user && <Route path="/login" exact component={Login} />}
          {!user && <Route path="/signup" exact component={Signup} />}
          <ProtectedRoute
            path="/"
            exact
            component={() => <LandingPage user={user} />}
          />
          <ProtectedRoute
            exact
            path="/ticket/edit/:ticketId"
            component={TicketEdit}
          />
          <ProtectedRoute exact path="/ticket/create" component={TicketEdit} />
          <ProtectedRoute
            exact
            path="/ticket/view/:ticketId"
            component={TicketView}
          />
          <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
