import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Redirect, useRouteMatch } from "react-router-dom";
import Navbar from "./Navbar";
import CenteredVertically from "../Helpers/CenteredVertically";

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
      <CenteredVertically>
        <ButtonGroup
          orientation="vertical"
          size="large"
          color="secondary"
          aria-label="large contained primary button group"
          variant="contained"
        >
          <Button onClick={() => setRedirect("login")}>Log In</Button>
          <Button onClick={() => setRedirect("register")}>Register</Button>
        </ButtonGroup>
      </CenteredVertically>
    </>
  );
};

export default AuthorizationChoice;
