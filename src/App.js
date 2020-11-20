import React, { useState } from "react";
import HomePage from "./Components/Authorized/HomePage";
import AuthorizePage from "./Components/Unauthorized/AuthorizePage";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const isTokenUpToDate = (user) => user.expirationDate > Date.now();

function App() {
  const [cookies, setCookie] = useCookies(["user"]);
  const [isAuthorized, setAuthorized] = useState(
    cookies["user"] !== undefined && isTokenUpToDate(cookies["user"])
  );

  const [, setUser] = useState(undefined);

  const handleAuthorization = ({ user, doRememberMe }) => {
    setAuthorized(true);
    setUser(user);
    if (doRememberMe) {
      setCookie("user", user);
    }
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/authorize">
            <AuthorizePage
              handleAuthorization={handleAuthorization}
              isAuthorized={isAuthorized}
            />
          </Route>
          <Route path="/">
            <HomePage isAuthorized={isAuthorized} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
