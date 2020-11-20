import React from "react";
import Grid from "@material-ui/core/Grid";
import LoginForm from "./LoginForm";

const LoginPage = ({ setUser }) => {
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
          <LoginForm setUser={setUser} />
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
