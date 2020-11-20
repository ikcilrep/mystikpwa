import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Redirect, useRouteMatch } from "react-router-dom";

const AuthorizationChoice = () => {
  const [redirect, setRedirect] = useState(null);

  let match = useRouteMatch();

  if (redirect !== null) {
    return <Redirect to={redirect} />;
  }

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
            onClick={() => setRedirect(`${match.path}/login`)}
          >
              Log In
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => setRedirect(`${match.path}/register`)}
          >
           Register 
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthorizationChoice;
