import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Redirect, useRouteMatch } from "react-router-dom";
import Navbar from "./Navbar";
import CenteredVertical from "../Helpers/CenteredVertical";

const AuthorizationChoice = () => {
  const [redirectPath, setRedirectPath] = useState(null);

  let match = useRouteMatch();

  if (redirectPath !== null) {
    return <Redirect to={redirectPath} />;
  }

  const setRedirect = (redirectName) => {
    setRedirectPath(`${match.path}/${redirectName}`);
  };

  return (
    <>
      <Navbar isMainPage={true} />
      <CenteredVertical
        component={
          <>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => setRedirect("login")}
            >
              Log In
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => setRedirect("register")}
            >
              Register
            </Button>
          </>
        }
      />
    </>
  );
};

export default AuthorizationChoice;
