import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import { validateUsername, validatePassword } from "../../Helpers/Validation";
import { serverAddress } from "../../settings.json";
import axios from "axios";
import { handleErrorMessage } from "../../Helpers/ErrorHandling";

const LoginForm = ({ handleAuthorization }) => {
  const [doRememberMe, setRememberMe] = useState(true);
  const handleChange = (event) => {
    setRememberMe(event.target.checked);
  };

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

  const isThereAValidationError = () =>
    validateUsername(username).error || validatePassword(password).error;

  const handleLogIn = async () => {
    try {
      const response = await axios.post(
        `${serverAddress}/users/authenticate`,
        {
          username,
          password,
        },
        { headers: { "content-type": "application/json" } }
      );

      handleAuthorization({
        user: {
          id: response.data.id,
          token: response.data.token,
          expirationDate: Date.parse(response.data.expirationDate),
        },
        doRememberMe,
      });
    } catch (err) {
      handleErrorMessage(err, setErrorMessage);
    }
  };

  return (
    <div>
      <h1>Log In</h1>

      <h3 style={{ color: "red" }}>{errorMessage}</h3>

      <TextField
        required
        id="outlined-basic"
        label="Username"
        value={username}
        error={usernameValidation.error}
        onChange={onChangeUsername}
      />

      <h4>{usernameValidation.message}</h4>

      <TextField
        required
        id="outlined-basic"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        error={passwordValidation.error}
        onChange={onChangePassword}
      />

      <h4>{passwordValidation.message}</h4>

      <FormControlLabel
        control={<Checkbox checked={doRememberMe} onChange={handleChange} />}
        label="Remember me"
      />

      <IconButton
        variant="contained"
        color="secondary"
        onClick={handleLogIn}
        disabled={isThereAValidationError()}
      >
        <DoneIcon />
      </IconButton>
    </div>
  );
};

export default LoginForm;
