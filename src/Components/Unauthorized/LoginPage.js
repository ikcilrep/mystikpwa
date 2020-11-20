import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";
import { Redirect } from "react-router-dom";
import CollapsingAlert from "../Helpers/CollapsingAlert";

const LoginPage = ({ handleAuthorization, alert, setAlert }) => {
  const [isRedirectBack, setRedirectBack] = useState(false);

  if (isRedirectBack) {
    return <Redirect to="/authorize" />;
  }

  const handleRedirectBack = () => setRedirectBack(true);

  return (
    <>
      <Navbar isMainPage={false} handleRedirectBack={handleRedirectBack} />
      <CollapsingAlert text={alert} onClose={() => setAlert("")} />

      <center>
        <LoginForm handleAuthorization={handleAuthorization} />
      </center>
    </>
  );
};

export default LoginPage;
