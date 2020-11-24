import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import LoadingPage from "./LoadingPage";
import { validateRepeatedPassword } from "../../Helpers/Validation";
import DoneIcon from "@material-ui/icons/Done";
import { hashPassword } from "../../Helpers/Security";

const ConversationCreator = ({ user, isAuthenticated, logout, connection }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [repeatedPasswordValidation, setRepeatedPasswordValidation] = useState({
    error: false,
    message: "",
  });

  const [friends, setFriends] = useState(undefined);
  const [redirectPath, setRedirectPath] = useState(undefined);

  const setInviteFriend = (friendId, doInvite) => {
    const invitedFriendsCopy = { ...friends };
    invitedFriendsCopy[friendId] = doInvite;
    setFriends(invitedFriendsCopy);
  };

  useEffect(() => {
    if (user !== undefined) {
      const invitedFriendsTmp = {};
      if (friends === undefined) {
        user.friends.forEach((friend) => {
          invitedFriendsTmp[friend.id] = false;
        });
      } else {
        user.friends
          .filter((f) => !(f.id in friends))
          .forEach((newFriend) => {
            invitedFriendsTmp[newFriend.id] = false;
          });

        Object.keys(invitedFriendsTmp).forEach((friendId) => {
          if (user.friends.every((f) => f.id !== friendId))
            delete friends[friendId];
        });
      }

      setFriends(invitedFriendsTmp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!isAuthenticated) {
    return <Redirect to="/authenticate" />;
  }

  if (user === undefined || connection === undefined) {
    return <LoadingPage />;
  }

  if (redirectPath !== undefined) {
    return <Redirect to={redirectPath} />;
  }

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    setRepeatedPasswordValidation(
      validateRepeatedPassword(password, repeatedPassword)
    );
  };

  const onChangeRepeatedPassword = (e) => {
    const repeatedPassword = e.target.value;
    setRepeatedPassword(repeatedPassword);
    setRepeatedPasswordValidation(
      validateRepeatedPassword(password, repeatedPassword)
    );
  };

  const isThereAValidationError = () =>
    name === "" ||
    password === "" ||
    validateRepeatedPassword(password, repeatedPassword).error;

  const handleHomeRedirect = () => setRedirectPath("/");

  const handleCreatingConversation = async () => {
    const hash = await hashPassword(password, user.id);
    const invitedFriendsIds = Object.keys(friends).filter((id) => friends[id]);
    connection.invoke("CreateConversation", name, [...hash], invitedFriendsIds);
    handleHomeRedirect();
  };

  return (
    <div>
      <Navbar logout={logout} handleHomeRedirect={handleHomeRedirect} />
      <center>
        <Grid container>
          <Grid item xs={12}>
            <h1>Create a conversation</h1>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
              label="Name"
              value={name}
              color="secondary"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              color="secondary"
              variant="outlined"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={onChangePassword}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-basic"
              color="secondary"
              variant="outlined"
              label="Repeat password"
              type="password"
              autoComplete="current-password"
              value={repeatedPassword}
              error={repeatedPasswordValidation.error}
              onChange={onChangeRepeatedPassword}
            />
          </Grid>

          <Grid item xs={12}>
            <h4>{repeatedPasswordValidation.message}</h4>
          </Grid>

          <Grid item xs={12}>
            {user.friends.length > 0 ? (
              <h2>Invite friends!</h2>
            ) : (
              <h2>You don't have any friends to invite.</h2>
            )}
          </Grid>

          <Grid item xs={5}></Grid>
          <Grid item xs={4}>
            {friends === undefined ? (
              <CircularProgress />
            ) : (
              <List>
                {user.friends.map((friend) => (
                  <ListItem key={friend.id}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={friends[friend.id]}
                        onChange={(e) =>
                          setInviteFriend(friend.id, e.target.checked)
                        }
                        tabIndex={-1}
                        disableRipple
                        //inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={friend.nickname}
                      secondary={friend.id}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={12}>
            <IconButton
              disabled={isThereAValidationError()}
              variant="contained"
              color="secondary"
              onClick={handleCreatingConversation}
            >
              <DoneIcon />
            </IconButton>{" "}
          </Grid>
        </Grid>
      </center>
    </div>
  );
};

export default ConversationCreator;
