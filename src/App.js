import React, { useState, useEffect } from "react";
import HomePage from "./Components/Authenticated/HomePage";
import AuthenticationPage from "./Components/Unauthenticated/AuthenticationPage";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import { ThemeProvider } from "@material-ui/styles";
import updateUser from "./Helpers/UserUpdating";
import { serverAddress } from "./settings.json";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ConversationCreator from "./Components/Authenticated/ConversationCreator";
import {
  receiveInvitation,
  deleteInvitation,
  addFriend,
  deleteFriend,
  joinConversation
} from "./ClientSideMethods";

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
  const [doRememberMe, setRememberMe] = useState(false);
  const [alert, setAlert] = useState("");

  const logout = () => {
    removeCookie("user");
    setUser(undefined);
    setAuthenticated(false);
  };

  const handleAuthentication = ({ user, doRememberMe }) => {
    setAuthenticated(true);
    setRememberMe(doRememberMe);
    updateUser(user).then((updatedUser) => {
      setUser(updatedUser);
    });

    if (doRememberMe) {
      setCookie("user", user);
    }
  };

  useEffect(() => {
    if (cookies["user"] !== undefined && isTokenUpToDate(cookies["user"])) {
      updateUser(cookies["user"]).then((updatedUser) => {
        setUser(updatedUser);
        setCookie("user", updatedUser);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [connection, setConnection] = useState(undefined);
  useEffect(() => {
    if (doRememberMe) {
      setCookie("user", user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, doRememberMe]);

  const addSignalrListeners = (connection) => {
    connection.on("ReceiveInvitation", receiveInvitation(user, setUser));
    connection.on("DeleteInvitation", deleteInvitation(user, setUser));
    connection.on("AddFriend", addFriend(user, setUser));
    connection.on("DeleteFriend", deleteFriend(user, setUser));
    connection.on("JoinConversation", joinConversation(user, setUser));
  };

  const removeSingalrListeners = () => {
    connection.off("ReceiveInvitation");
    connection.off("DeleteInvitation");
    connection.off("AddFriend");
    connection.off("DeleteFriend");
    connection.off("JoinConversation");
  };

  useEffect(() => {
    if (user !== undefined && connection === undefined) {
      const connection = new HubConnectionBuilder()
        .withUrl(`${serverAddress}/chat`, {
          accessTokenFactory: () => user.token,
        })
        .configureLogging(LogLevel.Trace)
        .build();
      addSignalrListeners(connection);
      connection.start().then(() => {
        setConnection(connection);
      });
    }

    if (connection !== undefined) {
      removeSingalrListeners();
      addSignalrListeners(connection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Switch>
            <Route path={`/conversations/create`}>
              <ConversationCreator
                user={user}
                isAuthenticated={isAuthenticated}
                connection={connection}
              />
            </Route>
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
                setUser={setUser}
                alert={alert}
                setAlert={setAlert}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
