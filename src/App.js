import React, { useState } from "react";
import HomePage from "./Components/Authorized/HomePage";
import AuthorizePage from "./Components/Unauthorized/AuthorizePage";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const isTokenUpToDate = (user) => user.expirationDate > Date.now();

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [isAuthorized, setAuthorized] = useState(
    cookies["user"] !== undefined && isTokenUpToDate(cookies["user"])
  );

  const [, setUser] = useState(undefined);

  const logout = () => {
    removeCookie("user");
    setUser(undefined);
    setAuthorized(false);
  };

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
            <HomePage isAuthorized={isAuthorized} logout={logout} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
