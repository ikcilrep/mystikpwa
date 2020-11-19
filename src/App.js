import React, { useState } from "react";
import MainPage from "./Components/MainPage";
import LoginPage from "./Components/LoginPage";
import { useCookies } from "react-cookie";

const isTokenUpToDate = (user) => user.expirationDate < Date.now();

function App() {
  const [cookies, setCookie] = useCookies(["user"]);
  const [isAuthorized, setAuthorized] = useState(
    cookies["user"] !== undefined && isTokenUpToDate(cookies["user"])
  );

  return isAuthorized ? <MainPage /> : <LoginPage />;
}

export default App;
