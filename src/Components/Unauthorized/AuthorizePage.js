import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import React, { useState } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import AuthorizationChoice from "./AuthorizationChoice";

const AuthorizePage = ({ handleAuthorization, isAuthorized }) => {
  let match = useRouteMatch();

  const [alert, setAlert] = useState("");

  if (isAuthorized) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/login`}>
          <LoginPage handleAuthorization={handleAuthorization} alert={alert} />
        </Route>
        <Route path={`${match.path}/register`}>
          <RegisterPage setAlert={setAlert} />
        </Route>
        <Route path={match.path}>
          <AuthorizationChoice />
        </Route>
      </Switch>
    </div>
  );
};

export default AuthorizePage;
