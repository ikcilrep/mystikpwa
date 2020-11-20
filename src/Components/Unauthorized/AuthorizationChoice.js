import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Redirect, useRouteMatch } from "react-router-dom";

const AuthorizationChoice = ({ setMainPage }) => {
  const [redirectPath, setRedirectPath] = useState(null);

  let match = useRouteMatch();

  if (redirectPath !== null) {
    return <Redirect to={redirectPath} />;
  }

  const setRedirect = (redirectName) => {
    setMainPage(false);
    setRedirectPath(`${match.path}/${redirectName}`);
  };

  return (
    <div>
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
    </div>
  );
};

export default AuthorizationChoice;
