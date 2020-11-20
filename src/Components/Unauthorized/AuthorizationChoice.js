import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Redirect, useRouteMatch } from "react-router-dom";
import Navbar from "./Navbar";

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
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
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
        </Grid>
      </Grid>
    </>
  );
};

export default AuthorizationChoice;
