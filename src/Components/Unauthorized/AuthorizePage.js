import Navbar from "./Navbar";
import LoginPage from "./LoginPage";
import React, { useState } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import AuthorizationChoice from "./AuthorizationChoice";

const AuthorizePage = ({ handleAuthorization, isAuthorized }) => {
  let match = useRouteMatch();

  const [isMainPage, setMainPage] = useState(true);

  if (isAuthorized) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Navbar isMainPage={isMainPage} />
      <Switch>
        <Route path={`${match.path}/login`}>
          <LoginPage handleAuthorization={handleAuthorization} />
        </Route>
        <Route path={`${match.path}/register`}>
          <h1>Register</h1>
        </Route>
        <Route path={match.path}>
          <AuthorizationChoice setMainPage={setMainPage} />
        </Route>
      </Switch>
    </div>
  );
};

export default AuthorizePage;
