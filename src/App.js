import React, { useState, useEffect } from "react";
import HomePage from "./Components/Authenticated/HomePage";
import AuthenticationPage from "./Components/Unauthenticated/AuthenticationPage";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import { ThemeProvider } from "@material-ui/styles";
import updateUser from "./Helpers/UpdateUser";
import { serverAddress } from "./settings.json";
import { HubConnectionBuilder } from "@microsoft/signalr";

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

  const [user, setUser] = useState(undefined);

  const logout = () => {
    removeCookie("user");
    setUser(undefined);
    setAuthenticated(false);
  };

  const handleAuthentication = ({ user, doRememberMe }) => {
    setAuthenticated(true);
    updateUser(user).then((updatedUser) => {
      setUser(updatedUser);
    });

    if (doRememberMe) {
      setCookie("user", user);
    }
  };

  useEffect(() => {
    if (
      user === undefined &&
      cookies["user"] !== undefined &&
      isTokenUpToDate(cookies["user"])
    ) {
      updateUser(cookies["user"]).then((updatedUser) => {
        setUser(updatedUser);
        setCookie("user", updatedUser);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [connection, setConnection] = useState(undefined);

  useEffect(() => {
    if (user !== undefined && connection === undefined) {
      const connection = new HubConnectionBuilder()
        .withUrl(`${serverAddress}/chat`, {
          accessTokenFactory: () => user.token,
        })
        .build();

      connection.start().then(() => {
        setConnection(connection);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
              <HomePage
                isAuthenticated={isAuthenticated}
                connection={connection}
                logout={logout}
                user={user}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
