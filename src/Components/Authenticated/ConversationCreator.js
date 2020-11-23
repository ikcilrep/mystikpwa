import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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

const ConversationCreator = ({ user, isAuthenticated, logout }) => {
  const [, setName] = useState("");

  const [invitedFriends, setInvitedFriends] = useState(undefined);
  const [redirectPath, setRedirectPath] = useState(undefined);

  const setInviteFriend = (friendId, doInvite) => {
    const invitedFriendsCopy = { ...invitedFriends };
    invitedFriendsCopy[friendId] = doInvite;
    setInvitedFriends(invitedFriendsCopy);
  };

  useEffect(() => {
    if (user !== undefined) {
      const invitedFriendsTmp = {};
      if (invitedFriends === undefined) {
        user.friends.forEach((friend) => {
          invitedFriendsTmp[friend.id] = false;
        });
      } else {
        user.friends
          .filter((f) => !(f.id in invitedFriends))
          .forEach((newFriend) => {
            invitedFriendsTmp[newFriend.id] = false;
          });

        Object.keys(invitedFriendsTmp).forEach((friendId) => {
          if (user.friends.every((f) => f.id !== friendId))
            delete invitedFriends[friendId];
        });
      }

      setInvitedFriends(invitedFriendsTmp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!isAuthenticated) {
    return <Redirect to="/authenticate" />;
  }

  if (user === undefined) {
    return <LoadingPage />;
  }

  if (redirectPath !== undefined) {
    return <Redirect to={redirectPath} />;
  }

  return (
    <div>
      <Navbar logout={logout} handleHomeRedirect={() => setRedirectPath("/")} />
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
              color="secondary"
            />
          </Grid>
          <br />
          <br />
          <Grid item xs={12}>
            {user.friends.length > 0 ? (
              <h2>Invite friends!</h2>
            ) : (
              <h2>You don't have any friends to invite.</h2>
            )}
          </Grid>

          <Grid item xs={5}></Grid>
          <Grid item xs={4}>
            {invitedFriends === undefined ? (
              <CircularProgress />
            ) : (
              <List>
                {user.friends.map((friend) => (
                  <ListItem key={friend.id}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={invitedFriends[friend.id]}
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
            <Button variant="contained" color="secondary">
              Create
            </Button>
          </Grid>
        </Grid>
      </center>
    </div>
  );
};

export default ConversationCreator;
