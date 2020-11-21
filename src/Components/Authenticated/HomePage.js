import Navbar from "./Navbar";
import React from "react";
import { Redirect } from "react-router-dom";

const HomePage = ({ isAuthenticated, logout }) => {
  if (!isAuthenticated) {
    return <Redirect to="/Authenticate" />;
  }

  return (
    <div>
      <Navbar logout={logout} />
   </div>
  );
};

export default HomePage;
