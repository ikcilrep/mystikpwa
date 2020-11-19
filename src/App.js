import React, { useState } from "react";
import AuthorizedNavbar from "./Components/AuthorizedNavbar";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie] = useCookies(["user"]);
  const [isAuthorized, setAuthorized] = useState(
    cookies["user"] !== undefined && cookies["user"].expirationDate < Date.now()
  );

  return (
    <div>
      <AuthorizedNavbar />
    </div>
  );
}

export default App;
