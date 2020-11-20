import React from "react";
import Grid from "@material-ui/core/Grid";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";

const LoginPage = ({ handleAuthorization }) => {
  return (
    <>
      <Navbar isMainPage={false} />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <LoginForm handleAuthorization={handleAuthorization} />
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
