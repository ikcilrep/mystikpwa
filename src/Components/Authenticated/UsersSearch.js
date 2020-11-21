import React, { useState, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import UndoIcon from "@material-ui/icons/Undo";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import axios from "axios";
import { serverAddress } from "../../settings.json";
import { InsertDriveFileRounded } from "@material-ui/icons";

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

  const handleInvitation = (foundUser) => {
    connection.invoke("inviteFriends", [foundUser.id]);
    const userCopy = { ...user };
    userCopy.invited.push(foundUser);
    setUser(userCopy);
  };

  const handleInvitationUndo = (foundUser) => {
    connection.invoke("deleteInvitations", [foundUser.id]);
    const userCopy = { ...user };
    userCopy.invited = userCopy.invited.filter((i) => i.id !== foundUser.id);
    setUser(userCopy);
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
                  onClick={() => handleInvitation(foundUser)}
                >
                  <AddIcon />
                </IconButton>
              ) : (
                <IconButton
                  color="secondary"
                  onClick={() => handleInvitationUndo(foundUser)}
                >
                  <UndoIcon />
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UsersSearch;
