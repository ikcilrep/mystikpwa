import Navbar from "./Navbar";
import React from "react";
import { Redirect } from "react-router-dom";

const HomePage = ({ isAuthorized }) => {
  if (!isAuthorized) {
    return <Redirect to="/authorize" />;
  }

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default HomePage;
