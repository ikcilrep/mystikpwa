import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import CenteredHorizontal from "../Helpers/CenteredHorizontal";
import {
  validateUsername,
  validateNickname,
  validatePassword,
} from "../../Helpers/Validation";
import { serverAddress } from "../../settings.json";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { handleErrorMessage } from "../../Helpers/ErrorHandling";

const RegisterForm = ({ setAlert }) => {
  const [isRegistered, setRegistered] = useState(false);

  const [doRememberMe, setRememberMe] = useState(true);
  const handleChange = (event) => {
    setRememberMe(event.target.checked);
  };

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

  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async ({ username, password }) => {
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
        <CenteredHorizontal>
          <h1>Register</h1>
        </CenteredHorizontal>

        <CenteredHorizontal>
          <h3 style={{ color: "red" }}>{errorMessage}</h3>
        </CenteredHorizontal>

        <CenteredHorizontal>
          <TextField
            required
            id="outlined-basic"
            label="Nickname"
            variant="outlined"
            value={nickname}
            error={nicknameValidation.error}
            onChange={onChangeNickname}
          />
        </CenteredHorizontal>

        <CenteredHorizontal>
          <h4>{nicknameValidation.message}</h4>
        </CenteredHorizontal>

        <CenteredHorizontal>
          <TextField
            required
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={username}
            error={usernameValidation.error}
            onChange={onChangeUsername}
          />
        </CenteredHorizontal>

        <CenteredHorizontal>
          <h4>{usernameValidation.message}</h4>
        </CenteredHorizontal>

        <CenteredHorizontal>
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
        </CenteredHorizontal>

        <CenteredHorizontal>
          <h4>{passwordValidation.message}</h4>
        </CenteredHorizontal>

        <CenteredHorizontal>
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => handleSignIn({ username, password })}
          >
            <DoneIcon />
          </IconButton>
        </CenteredHorizontal>
      </Grid>
    </div>
  );
};

export default RegisterForm;
