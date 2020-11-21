import Navbar from "./Navbar";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ConversationsList from "./ConversationsList";
import UsersSearch from "./UsersSearch";
import CircularProgress from "@material-ui/core/CircularProgress";

const HomePage = ({ isAuthenticated, logout, user }) => {
  const [query, setQuery] = useState("");

  if (!isAuthenticated) {
    return <Redirect to="/Authenticate" />;
  }

  const conversations = user === undefined ? [] : user.conversations;

  if (user === undefined) {
    return (
      <div>
        <Navbar logout={logout} setQuery={setQuery} />
        <CircularProgress/>
      </div>
    );
  }

  return (
    <div>
      <Navbar logout={logout} setQuery={setQuery} />
      {query === "" ? (
        <ConversationsList conversations={conversations} />
      ) : (
        <UsersSearch query={query} user={user} />
      )}
    </div>
  );
};

export default HomePage;
