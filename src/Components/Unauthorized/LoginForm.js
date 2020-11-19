import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import Centered from "../Helpers/Centered";

const LoginForm = () => {
  const [doRememberMe, setRememberMe] = useState(true);
  const handleChange = (event) => {
    setRememberMe(event.target.checked);
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
          component={
            <TextField
              required
              id="outlined-basic"
              label="Nickname"
              variant="outlined"
            />
          }
        />

        <Centered
          component={
            <TextField
              required
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              autoComplete="current-password"
            />
          }
        />

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
            <IconButton variant="contained" color="primary">
              <DoneIcon />
            </IconButton>
          }
        />
      </Grid>
    </div>
  );
};

export default LoginForm;
