import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import LoadingPage from "./LoadingPage";
import Navbar from "./Navbar";
import { verifyPassword } from "../../Helpers/Security";
import Chat from "./Chat";

const Conversation = ({
  conversationId,
  isAuthenticated,
  user,
  connection,
  logout,
}) => {
  const [password, setPassword] = useState("");
  const [redirectPath, setRedirectPath] = useState(undefined);
  const [isPasswordCorrect, setPasswordCorrect] = useState(false);
  const [conversation, setConversation] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user !== undefined) {
      const conversationTmp = user.conversations.find(
        (c) => c.id === conversationId
      );
      if (conversationTmp !== undefined) {
        setConversation(conversationTmp);
        verifyPassword(
          password,
          user.id,
          conversationTmp.passwordHashData
        ).then((isPasswordCorrect) => {
          setPasswordCorrect(isPasswordCorrect);
        });
      } else {
        handleHomeRedirect();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, conversationId]);

  const handleHomeRedirect = () => setRedirectPath("/");

  const handlePasswordEnter = async () => {
    const isPasswordCorrect = await verifyPassword(
      password,
      user.id,
      conversation.passwordHashData
    );

    if (!isPasswordCorrect) {
      setErrorMessage("Password isn't correct.");
    } else {
      setErrorMessage("");
    }

    setPasswordCorrect(isPasswordCorrect);
  };

  if (!isAuthenticated) {
    return <Redirect to="/authenticate" />;
  }

  if (conversationId === undefined) {
    return <Redirect to="/" />;
  }

  if (
    user === undefined ||
    connection === undefined ||
    conversation === undefined
  ) {
    return <LoadingPage />;
  }

  if (redirectPath !== undefined) {
    return <Redirect to={redirectPath} />;
  }

  return (
    <div>
      <Navbar logout={logout} handleHomeRedirect={handleHomeRedirect} />
      <center>
        {isPasswordCorrect ? (
          <Chat
            conversation={conversation}
            user={user}
            password={password}
            connection={connection}
          />
        ) : (
          <>
            <h1>{conversation.name}</h1>
            <h2>Enter conversation password</h2>
            <TextField
              required
              id="outlined-basic"
              color="secondary"
              variant="outlined"
              label="Password"
              type="password"
              autoComplete="current-password"
              error={errorMessage !== ""}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <h4>{errorMessage}</h4>
            <IconButton
              variant="contained"
              color="secondary"
              onClick={handlePasswordEnter}
            >
              <DoneIcon />
            </IconButton>
          </>
        )}
      </center>
    </div>
  );
};
export default Conversation;
