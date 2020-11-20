import React, { useState } from "react";
import HomePage from "./Components/Authorized/HomePage";
import AuthorizePage from "./Components/Unauthorized/AuthorizePage";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#f44336",
    },
  },
});

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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
