import React, { useState, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import UndoIcon from "@material-ui/icons/Undo";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import axios from "axios";
import { serverAddress } from "../../settings.json";
import User from "../../Helpers/UserModyfing";

const FriendsSearch = ({ user, query, connection, setUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleSearchRequest = async () => {
      const response = await axios.get(`${serverAddress}/users/search`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: {
          query,
        },
      });

      setUsers(response.data.filter((u) => u.id !== user.id));
    };

    handleSearchRequest();
  }, [query, user]);

  const handleInviting = (foundUser) => {
    connection.invoke("InviteFriends", [foundUser.id]);
    User.addInvited({ invitedUser: foundUser, user, setUser });
  };

  const handleDeletingInvitation = (foundUser) => {
    connection.invoke("DeleteInvitations", [foundUser.id]);
    User.deleteInvited({ invitedUser: foundUser, user, setUser });
  };

  const handleAcceptingInvitation = (foundUser) => {
    connection.invoke("AddFriend", foundUser.id);
    User.turnInviterIntoFriend({ inviter: foundUser, user, setUser });
  };

  const handleDeletingFriend = (foundUser) => {
    connection.invoke("DeleteFriends", [foundUser.id]);
    User.deleteFriend({ friend: foundUser, user, setUser });
  };

  const isInvited = (foundUser) =>
    user.invited.some((i) => i.id === foundUser.id);

  const isInviter = (foundUser) =>
    user.inviters.some((i) => i.id === foundUser.id);

  const isFriend = (foundUser) =>
    user.friends.some((i) => i.id === foundUser.id);

  const canUserBeInvited = (foundUser) =>
    !isInvited(foundUser) && !isInviter(foundUser) && !isFriend(foundUser);

  return (
    <div>
      <List>
        {users.map((foundUser, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={foundUser.nickname}
              secondary={foundUser.id}
            />
            <ListItemSecondaryAction>
              {canUserBeInvited(foundUser) ? (
                <IconButton
                  color="secondary"
                  onClick={() => handleInviting(foundUser)}
                >
                  <AddIcon />
                </IconButton>
              ) : isInvited(foundUser) ? (
                <IconButton
                  color="secondary"
                  onClick={() => handleDeletingInvitation(foundUser)}
                >
                  <UndoIcon />
                </IconButton>
              ) : isInviter(foundUser) ? (
                <IconButton
                  color="secondary"
                  onClick={() => handleAcceptingInvitation(foundUser)}
                >
                  <DoneIcon />
                </IconButton>
              ) : isFriend(foundUser) ? (
                <IconButton
                  color="secondary"
                  onClick={() => handleDeletingFriend(foundUser)}
                >
                  <DeleteIcon />
                </IconButton>
              ) : null}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FriendsSearch;
