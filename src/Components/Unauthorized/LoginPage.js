import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";
import { Redirect } from "react-router-dom";
import CollapsingAlert from "../Helpers/CollapsingAlert";

const LoginPage = ({ handleAuthorization, alert, setAlert }) => {
  const [redirectPath, setRedirectPath] = useState(undefined);

  if (redirectPath !== undefined) {
    return <Redirect to={redirectPath} />;
  }

  return (
    <>
      <Navbar />
      <CollapsingAlert text={alert} onClose={() => setAlert("")} />

      <center>
        <LoginForm
          handleAuthorization={handleAuthorization}
          setRedirectPath={setRedirectPath}
        />
      </center>
    </>
  );
};

export default LoginPage;
