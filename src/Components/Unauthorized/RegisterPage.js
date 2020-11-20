import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import Navbar from "./Navbar";
import { Redirect } from "react-router-dom";

const RegisterPage = ({ setAlert }) => {
  const [isRedirectBack, setRedirectBack] = useState(false);
  if (isRedirectBack) {
    return <Redirect to="/authorize" />;
  }

  const handleRedirectBack = () => setRedirectBack(true);

  return (
    <>
      <Navbar isMainPage={false} handleRedirectBack={handleRedirectBack} />
      <center>
        <RegisterForm setAlert={setAlert} />
      </center>
    </>
  );
};

export default RegisterPage;
