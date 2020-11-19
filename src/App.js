import React, { useState } from "react";
import Navbar from "./Components/Authorized/Navbar";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie] = useCookies(["user"]);
  const [isAuthorized, setAuthorized] = useState(
    cookies["user"] !== undefined && cookies["user"].expirationDate < Date.now()
  );

  return (
    <div>
      <Navbar />
    </div>
  );
}

export default App;
