import Navbar from "./Unauthorized/Navbar";
import LoginPage from "./Unauthorized/LoginPage";
import React from "react";

const UnauthorizedPage = ({ handleAuthorization }) => {
  return (
    <div>
      <Navbar />
      <LoginPage handleAuthorization={handleAuthorization} />
    </div>
  );
};

export default UnauthorizedPage;
