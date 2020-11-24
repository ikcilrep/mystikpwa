import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { verifyPassword } from "../../Helpers/Security";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));
const ConversationItem = ({ user, conversation }) => {
  const [, setPassword] = useState("");
  const [isPasswordCorrect, setPasswordCorrect] = useState(false);

  const onPasswordChange = async (password) => {
    const isPasswordCorrect = await verifyPassword(
      password,
      user.id,
      conversation.passwordHashData
    );
    setPasswordCorrect(isPasswordCorrect);
    setPassword(password);
  };

  return (
    <ListItem button>
      <ListItemIcon>
        {isPasswordCorrect ? <LockOpenIcon /> : <LockIcon />}
      </ListItemIcon>
      <ListItemText primary={conversation.name} />
      <ListItemSecondaryAction>
        <TextField
          required
          color="secondary"
          label="Password"
          type="password"
          onChange={(e) => onPasswordChange(e.target.value)}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
const ConversationsList = ({ user, conversations, setRedirectPath }) => {
  const classes = useStyles();

  return (
    <div>
      <h1>Hello, {user.nickname}!</h1>
      <List>
        {conversations.map((c) => (
          <ConversationItem user={user} conversation={c} key={c.id} />
        ))}
      </List>
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.fab}
        onClick={() => setRedirectPath("/conversations/create")}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default ConversationsList;
