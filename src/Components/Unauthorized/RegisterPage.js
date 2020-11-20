import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import RegisterForm from "./RegisterForm";
import Navbar from "./Navbar";
import { Redirect } from "react-router-dom";

const RegisterPage = ({ setAlert }) => {
  const [isRedirectBack, setRedirectBack] = useState(false);
  if (isRedirectBack) {
    return <Redirect to="/authorize" />;
  }

  const handleRedirectBack = () => setRedirectBack(true);

  return (
    <>
      <Navbar isMainPage={false} handleRedirectBack={handleRedirectBack} />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <RegisterForm setAlert={setAlert} />
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterPage;
