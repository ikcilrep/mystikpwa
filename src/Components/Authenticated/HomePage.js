import Navbar from "./Navbar";
import React from "react";
import { Redirect } from "react-router-dom";
import ConversationsList from "./ConversationsList";

const HomePage = ({ isAuthenticated, logout, user }) => {
  if (!isAuthenticated) {
    return <Redirect to="/Authenticate" />;
  }

  const conversations = user === undefined ? [] : user.conversations;

  return (
    <div>
      <Navbar logout={logout} />
      <ConversationsList conversations={conversations} />
    </div>
  );
};

export default HomePage;
