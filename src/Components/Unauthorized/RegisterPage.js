import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import Navbar from "./Navbar";
import { Redirect } from "react-router-dom";

const RegisterPage = ({ setAlert }) => {
  const [redirectPath, setRedirectPath] = useState(undefined);

  if (redirectPath !== undefined) {
    return <Redirect to={redirectPath} />;
  }

  return (
    <>
      <Navbar />
      <center>
        <RegisterForm setAlert={setAlert} setRedirectPath={setRedirectPath} />
      </center>
    </>
  );
};

export default RegisterPage;
