import React, { useState, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import axios from "axios";
import { serverAddress } from "../../settings.json";

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

  const isInvited = (searchedUser) =>
    user.invited.some((i) => i.id === searchedUser.id);
  const isInviter = (searchedUser) =>
    user.inviters.some((i) => i.id === searchedUser.id);

  const canUserBeInvited = (user) => {
    return !isInvited(user) && !isInviter(user);
  };

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
              <IconButton
                color="secondary"
                disabled={!canUserBeInvited(foundUser)}
                onClick={() => handleInvitation(foundUser)}
              >
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UsersSearch;
