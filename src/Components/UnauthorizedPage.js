import Navbar from "./Unauthorized/Navbar";
import LoginPage from "./Unauthorized/LoginPage";
import React from "react";

const UnauthorizedPage = ({ setUser }) => {
  return (
    <div>
      <Navbar />
      <LoginPage setUser={setUser} />
    </div>
  );
};

export default UnauthorizedPage;
