import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const ConversationItem = ({ conversation }) => {
  return (
    <ListItem>
      <ListItemText primary={conversation.name} />
    </ListItem>
  );
};

const ConversationsList = ({ user, conversations }) => {
  return (
    <div>
      <h1>Conversations</h1>
      <List>
        {conversations.map((c) => (
          <ConversationItem conversation={c} />
        ))}
      </List>
    </div>
  );
};

export default ConversationsList;
