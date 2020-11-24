import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));
const ConversationItem = ({ conversation, handleConversationRedirect }) => {
  return (
    <ListItem
      button
      onClick={() => handleConversationRedirect(conversation.id)}
    >
      <ListItemText primary={conversation.name} />
    </ListItem>
  );
};
const ConversationsList = ({
  user,
  conversations,
  setCurrentConversationId,
}) => {
  const classes = useStyles();
  const [redirectPath, setRedirectPath] = useState(undefined);

  if (redirectPath !== undefined) {
    return <Redirect to={redirectPath} />;
  }

  const handleConversationRedirect = (conversationId) => {
    setCurrentConversationId(conversationId);
    setRedirectPath("/conversation");
  };

  return (
    <div>
      <h1>Hello, {user.nickname}!</h1>
      <List>
        {conversations.map((c) => (
          <ConversationItem
            user={user}
            conversation={c}
            key={c.id}
            handleConversationRedirect={handleConversationRedirect}
          />
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
