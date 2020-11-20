import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import CenteredHorizontally from "../Helpers/CenteredHorizontally";
import {
  validateUsername,
  validateNickname,
  validatePassword,
  validateRepeatedPassword,
} from "../../Helpers/Validation";
import { serverAddress } from "../../settings.json";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { handleErrorMessage } from "../../Helpers/ErrorHandling";

const RegisterForm = ({ setAlert }) => {
  const [isRegistered, setRegistered] = useState(false);

  const [nickname, setNickname] = useState("");
  const [nicknameValidation, setNicknameValidation] = useState({
    error: false,
    message: "",
  });

  const [username, setUsername] = useState("");
  const [usernameValidation, setUsernameValidation] = useState({
    error: false,
    message: "",
  });

  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState({
    error: false,
    message: "",
  });

  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [repeatedPasswordValidation, setRepeatedPasswordValidation] = useState({
    error: false,
    message: "",
  });

  const onChangeNickname = (e) => {
    const nickname = e.target.value;
    setNickname(nickname);
    setNicknameValidation(validateNickname(nickname));
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
    setUsernameValidation(validateUsername(username));
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    setPasswordValidation(validatePassword(password));
  };

  const onChangeRepeatedPassword = (e) => {
    const repeatedPassword = e.target.value;
    setRepeatedPassword(repeatedPassword);
    setRepeatedPasswordValidation(
      validateRepeatedPassword(password, repeatedPassword)
    );
  };

  const isThereAValidationError = () =>
    validateNickname(nickname).error ||
    validateUsername(username).error ||
    validatePassword(password).error ||
    validateRepeatedPassword(password, repeatedPassword).error;

  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(
        `${serverAddress}/users/register`,
        {
          nickname,
          username,
          password,
        },
        { headers: { "content-type": "application/json" } }
      );
      setAlert("Successfully registered!");
      setRegistered(true);
    } catch (err) {
      handleErrorMessage(err, setErrorMessage);
    }
  };

  if (isRegistered) {
    return <Redirect to="/authorize/login" />;
  }

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
      >
        <CenteredHorizontally>
          <h1>Register</h1>
        </CenteredHorizontally>

        <CenteredHorizontally>
          <h3 style={{ color: "red" }}>{errorMessage}</h3>
        </CenteredHorizontally>

        <CenteredHorizontally>
          <TextField
            required
            id="outlined-basic"
            label="Nickname"
            variant="outlined"
            value={nickname}
            error={nicknameValidation.error}
            onChange={onChangeNickname}
          />
        </CenteredHorizontally>

        <CenteredHorizontally>
          <h4>{nicknameValidation.message}</h4>
        </CenteredHorizontally>

        <CenteredHorizontally>
          <TextField
            required
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={username}
            error={usernameValidation.error}
            onChange={onChangeUsername}
          />
        </CenteredHorizontally>

        <CenteredHorizontally>
          <h4>{usernameValidation.message}</h4>
        </CenteredHorizontally>

        <CenteredHorizontally>
          <TextField
            required
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            autoComplete="current-password"
            value={password}
            error={passwordValidation.error}
            onChange={onChangePassword}
          />
        </CenteredHorizontally>

        <CenteredHorizontally>
          <h4>{passwordValidation.message}</h4>
        </CenteredHorizontally>

        <CenteredHorizontally>
          <TextField
            required
            id="outlined-basic"
            label="Repeat password"
            variant="outlined"
            type="password"
            autoComplete="current-password"
            value={repeatedPassword}
            error={repeatedPasswordValidation.error}
            onChange={onChangeRepeatedPassword}
          />
        </CenteredHorizontally>

        <CenteredHorizontally>
          <h4>{repeatedPasswordValidation.message}</h4>
        </CenteredHorizontally>

        <CenteredHorizontally>
          <IconButton
            disabled={isThereAValidationError()}
            variant="contained"
            color="primary"
            onClick={handleRegister}
          >
            <DoneIcon />
          </IconButton>
        </CenteredHorizontally>
      </Grid>
    </div>
  );
};

export default RegisterForm;
