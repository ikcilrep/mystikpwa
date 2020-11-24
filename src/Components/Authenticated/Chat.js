import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import { deriveKey } from "../../Helpers/Security";
import LoadingPage from "./LoadingPage";

const useStyles = makeStyles((theme) => ({
  messageInput: {
    position: "fixed",
    left: "0px",
    bottom: "0px",
    width: "100%",
  },
}));

const Message = ({ conversation, message, password }) => {
  const [decryptedData, setDecryptedData] = useState(undefined);

  const decryptMessage = async () => {
    const key = await deriveKey(password, conversation.id);
    const { decrypt } = await import("web-nse");

    const decryptedData = decrypt(message.encryptedContent, key).toString();

    setDecryptedData(decryptedData);
  };

  decryptMessage();

  if (decryptedData === undefined) {
    return <LoadingPage />;
  }
  return <p>{decryptedData}</p>;
};

const Chat = ({ conversation, user, password, connection }) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSendingMessage = async () => {
    const key = await deriveKey(password, conversation.id);
    const { encrypt } = await import("web-nse");

    const data = Buffer.from(message.normalize("NFKC"));
    const encryptedData = encrypt(data, key);

    connection.invoke("SendMessage", [...encryptedData], conversation.id);
    setMessage("");
  };

  return (
    <div>
      <h1>Chat!</h1>
      {conversation.messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          password={password}
          conversation={conversation}
        />
      ))}
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
                onClick={handleSendingMessage}
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
