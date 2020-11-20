import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import Centered from "../Helpers/Centered";
import { validateUsername, validatePassword } from "../../Helpers/Validation";
import { serverAddress } from "../../settings.json";

const axios = require("axios");

const LoginForm = ({ setUser }) => {
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

  const clearFields = () => {
    setUsername("");
    setPassword("");
  };

  const handleSignIn = ({ username, password }) => {
    axios
      .post(
        `${serverAddress}/users/authenticate`,
        {
          username,
          password,
        },
        { headers: { "content-type": "application/json" } }
      )
      .then((response) => {
        setUser({
          id: response.data.id,
          token: response.data.token,
          expirationDate: Date.parse(response.data.expirationDate),
        });
        setErrorMessage("");
        clearFields();
      })
      .catch((err) => {
        try {
          const message = err.response.data.message;
          if (message) {
            setErrorMessage(message);
          }
        } catch (_) {
          setErrorMessage("There was an error, try again.");
        }
      });
  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
      >
        <Centered component={<h1>Sign In</h1>} />
        <Centered
          component={<h3 style={{ color: "red" }}>{errorMessage}</h3>}
        />
        <Centered
          component={
            <TextField
              required
              id="outlined-basic"
              label="Username"
              variant="outlined"
              value={username}
              error={usernameValidation.error}
              onChange={onChangeUsername}
            />
          }
        />

        <Centered
        component={
          <h4>{usernameValidation.message}</h4>
        }/>


        <Centered
          component={
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
          }
        />

        <Centered
        component={
          <h4>{passwordValidation.message}</h4>
        }/>

        <Centered
          component={
            <FormControlLabel
              control={
                <Checkbox checked={doRememberMe} onChange={handleChange} />
              }
              label="Remember me"
            />
          }
        />

        <Centered
          component={
            <IconButton
              variant="contained"
              color="primary"
              onClick={() => handleSignIn({ username, password })}
            >
              <DoneIcon />
            </IconButton>
          }
        />
      </Grid>
    </div>
  );
};

export default LoginForm;
