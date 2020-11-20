import LoginPage from "./LoginPage";
import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import AuthorizationChoice from "./AuthorizationChoice";

const AuthorizePage = ({ handleAuthorization, isAuthorized }) => {
  let match = useRouteMatch();

  if (isAuthorized) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/login`}>
          <LoginPage handleAuthorization={handleAuthorization} />
        </Route>
        <Route path={`${match.path}/register`}>
          <h1>Register</h1>
        </Route>
        <Route path={match.path}>
          <AuthorizationChoice />
        </Route>
      </Switch>
    </div>
  );
};

export default AuthorizePage;
