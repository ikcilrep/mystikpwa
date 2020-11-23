import Navbar from "./Navbar";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ConversationsList from "./ConversationsList";
import ConversationCreator from "./ConversationCreator";
import FriendsSearch from "./FriendsSearch";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Switch, Route, useRouteMatch } from "react-router-dom";
const HomePage = ({ isAuthenticated, logout, user, connection, setUser }) => {
  let match = useRouteMatch();
  const [query, setQuery] = useState("");

  if (!isAuthenticated) {
    return <Redirect to="/authenticate" />;
  }

  const conversations = user === undefined ? [] : user.conversations;

  if (user === undefined || connection === undefined) {
    return (
      <div>
        <Navbar logout={logout} setQuery={setQuery} />
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Navbar logout={logout} setQuery={setQuery} />
      <Switch>
        <Route path={`${match.path}conversations/create`}>
          <ConversationCreator user={user} />
        </Route>
        <Route path={match.path}>
          {query === "" ? (
            <ConversationsList conversations={conversations} user={user} />
          ) : (
            <FriendsSearch
              query={query}
              user={user}
              connection={connection}
              setUser={setUser}
            />
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default HomePage;
