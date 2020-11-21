import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import React, { useState } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

const AuthenticationPage = ({ handleAuthentication, isAuthenticated }) => {
  let match = useRouteMatch();

  const [alert, setAlert] = useState("");

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/login`}>
          <LoginPage
            handleAuthentication={handleAuthentication}
            alert={alert}
            setAlert={setAlert}
          />
        </Route>
        <Route path={`${match.path}/register`}>
          <RegisterPage setAlert={setAlert} />
        </Route>
        <Route path={match.path}>
          <Redirect to={`${match.path}/login`} />
        </Route>
      </Switch>
    </div>
  );
};

export default AuthenticationPage;
