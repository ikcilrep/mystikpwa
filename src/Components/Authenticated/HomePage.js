import Navbar from "./Navbar";
import React from "react";
import { Redirect } from "react-router-dom";
import ConversationsList from "./ConversationsList";

const HomePage = ({ isAuthenticated, logout }) => {
  if (!isAuthenticated) {
    return <Redirect to="/Authenticate" />;
  }

  return (
    <div>
      <Navbar logout={logout} />
      <ConversationsList />
    </div>
  );
};

export default HomePage;
