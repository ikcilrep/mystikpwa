import Navbar from "./Navbar";
import React from "react";
import { Redirect } from "react-router-dom";

const HomePage = ({ isAuthorized, logout }) => {
  if (!isAuthorized) {
    return <Redirect to="/authorize" />;
  }

  return (
    <div>
      <Navbar logout={logout} />
    </div>
  );
};

export default HomePage;
