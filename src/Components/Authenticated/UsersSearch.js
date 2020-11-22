import React, { useState, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import UndoIcon from "@material-ui/icons/Undo";
import DoneIcon from "@material-ui/icons/Done";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import axios from "axios";
import { serverAddress } from "../../settings.json";
import {
  deleteInvited,
  addInvited,
  turnInviterIntoFriend,
} from "../../Helpers/UserModyfing";

const UsersSearch = ({ user, query, connection, setUser }) => {
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

      setUsers(response.data);
    };

    handleSearchRequest();
  }, [query, user]);

  const handleInviting = (foundUser) => {
    connection.invoke("inviteFriends", [foundUser.id]);
    addInvited({ invitedUser: foundUser, user, setUser });
  };

  const handleDeletingInvitation = (foundUser) => {
    connection.invoke("deleteInvitations", [foundUser.id]);
    deleteInvited({ invitedUser: foundUser, user, setUser });
  };

  const handleAcceptingInvitation = (foundUser) => {
    connection.invoke("AddFriend", foundUser.id);
    turnInviterIntoFriend({ inviter: foundUser, user, setUser });
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
              ) : null}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UsersSearch;
