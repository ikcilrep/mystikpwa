import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  messageInput: {
    position: "fixed",
    left: "0px",
    bottom: "0px",
    width: "100%",
  },
}));
const Chat = ({ conversation, user, password }) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>Chat!</h1>
      <TextField
        required
        color="secondary"
        placeholder="Message"
        value={message}
        variant="outlined"
        onChange={(e) => setMessage(e.target.value)}
        className={classes.messageInput}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onMouseDown={handleMouseDownPassword}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Chat;
