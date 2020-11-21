import React, { useState } from "react";
import HomePage from "./Components/Authenticated/HomePage";
import AuthenticationPage from "./Components/Unauthenticated/AuthenticationPage";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import { ThemeProvider } from "@material-ui/styles";

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
  const [isAuthenticated, setAuthenticated] = useState(
    cookies["user"] !== undefined && isTokenUpToDate(cookies["user"])
  );

  const [, setUser] = useState(undefined);

  const logout = () => {
    removeCookie("user");
    setUser(undefined);
    setAuthenticated(false);
  };

  const handleAuthentication = ({ user, doRememberMe }) => {
    setAuthenticated(true);
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
            <Route path="/authenticate">
              <AuthenticationPage
                handleAuthentication={handleAuthentication}
                isAuthenticated={isAuthenticated}
              />
            </Route>
            <Route path="/">
              <HomePage isAuthenticated={isAuthenticated} logout={logout} />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
