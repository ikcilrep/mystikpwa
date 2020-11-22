const addInvited = ({ invitedUser, user, setUser }) => {
  const userCopy = { ...user };
  userCopy.invited.push(invitedUser);
  setUser(userCopy);
};

const addInviter = ({ inviter, user, setUser }) => {
  const userCopy = { ...user };
  userCopy.inviters.push(inviter);
  setUser(userCopy);
};

const deleteInvited = ({ invitedUser, user, setUser }) => {
  const userCopy = { ...user };
  userCopy.invited = userCopy.invited.filter((i) => i.id !== invitedUser.id);
  setUser(userCopy);
};

const deleteInviter = ({ inviterId, user, setUser }) => {
  const userCopy = { ...user };
  userCopy.inviters = userCopy.inviters.filter((i) => i.id !== inviterId);
  setUser(userCopy);
};

const turnInviterIntoFriend = ({ inviter, user, setUser }) => {
  const userCopy = { ...user };
  userCopy.inviters = userCopy.inviters.filter((i) => i.id !== inviter.id);
  userCopy.friends.push(inviter);
  setUser(userCopy);
};

export { addInvited, addInviter, turnInviterIntoFriend, deleteInvited, deleteInviter };
