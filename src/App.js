import React, { useState } from "react";
import AuthorizedPage from "./Components/AuthorizedPage";
import UnauthorizedPage from "./Components/UnauthorizedPage";
import { useCookies } from "react-cookie";

const isTokenUpToDate = (user) => user.expirationDate < Date.now();

function App() {
  const [cookies, setCookie] = useCookies(["user"]);
  const [isAuthorized /* , setAuthorized */] = useState(
    cookies["user"] !== undefined && isTokenUpToDate(cookies["user"])
  );

  const [user, setUser] = useState(undefined);

  const handleAuthorization = ({ user, doRememberMe }) => {
    setUser(user);
    if (doRememberMe) {
      setCookie("user", user);
    }
  };

  return isAuthorized ? (
    <AuthorizedPage />
  ) : (
    <UnauthorizedPage handleAuthorization={handleAuthorization} />
  );
}

export default App;
