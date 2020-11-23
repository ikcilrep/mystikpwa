import SearchNavbar from "./SearchNavbar";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ConversationsList from "./ConversationsList";
import FriendsSearch from "./FriendsSearch";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import LoadingPage from "./LoadingPage";
const HomePage = ({ isAuthenticated, logout, user, connection, setUser }) => {
  let match = useRouteMatch();
  const [query, setQuery] = useState("");
  const [redirectPath, setRedirectPath] = useState(undefined);

  if (!isAuthenticated) {
    return <Redirect to="/authenticate" />;
  }

  const conversations = user === undefined ? [] : user.conversations;

  if (user === undefined || connection === undefined) {
    return <LoadingPage />;
  }

  if (redirectPath !== undefined) {
    return <Redirect to={redirectPath} />;
  }

  return (
    <div>
      <SearchNavbar logout={logout} setQuery={setQuery} />
      <Switch>
        <Route path={match.path}>
          {query === "" ? (
            <ConversationsList
              conversations={conversations}
              user={user}
              setRedirectPath={setRedirectPath}
            />
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
