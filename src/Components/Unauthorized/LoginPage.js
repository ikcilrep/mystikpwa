import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import LoginForm from "./LoginForm";
import Navbar from "./Navbar";
import { Redirect } from "react-router-dom";
import CollapsingAlert from "../Helpers/CollapsingAlert";
import CenteredVertical from "../Helpers/CenteredVertical";

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

      <CenteredVertical>
        <LoginForm handleAuthorization={handleAuthorization} />
      </CenteredVertical>
    </>
  );
};

export default LoginPage;
