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

  const setUser = (user) => {
    setCookie("user", user);
  };

  return isAuthorized ? (
    <AuthorizedPage />
  ) : (
    <UnauthorizedPage setUser={setUser} />
  );
}

export default App;
