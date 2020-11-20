import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import Navbar from "./Navbar";
import { Redirect } from "react-router-dom";
import CenteredVertically from "../Helpers/CenteredVertically";

const RegisterPage = ({ setAlert }) => {
  const [isRedirectBack, setRedirectBack] = useState(false);
  if (isRedirectBack) {
    return <Redirect to="/authorize" />;
  }

  const handleRedirectBack = () => setRedirectBack(true);

  return (
    <>
      <Navbar isMainPage={false} handleRedirectBack={handleRedirectBack} />
      <CenteredVertically>
        <RegisterForm setAlert={setAlert} />
      </CenteredVertically>
    </>
  );
};

export default RegisterPage;
