import React, { useState, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { serverAddress } from "../../settings.json";

const UsersSearch = ({ user, query }) => {
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
      console.log(response);

      setUsers(response.data);
    };

    handleSearchRequest();
  }, [query, user]);

  /* const handleInvitation = (user) => {};

  const isInvitedOrInviter = (searchedUser) => {};
 */
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
              <Button variant="contained" color="secondary">
                Invite
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UsersSearch;
