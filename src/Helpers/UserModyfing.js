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
  userCopy.invited = removeEntityWithId(userCopy.invited, invitedUser.id);;
  setUser(userCopy);
};

const deleteInviter = ({ inviterId, user, setUser }) => {
  const userCopy = { ...user };
  userCopy.inviters = removeEntityWithId(userCopy.inviters, inviterId);;
  setUser(userCopy);
};

const turnInviterIntoFriend = ({ inviter, user, setUser }) => {
  const userCopy = { ...user };
  userCopy.inviters = removeEntityWithId(userCopy.inviters, inviter.id);;
  userCopy.friends.push(inviter);
  setUser(userCopy);
};

const turnInvitedIntoFriend = ({ invited, user, setUser }) => {
  const userCopy = { ...user };
  userCopy.invited = removeEntityWithId(userCopy.invited, invited.id);
  userCopy.friends.push(invited);
  setUser(userCopy);
};

const removeEntityWithId = (entities, id) =>
  entities.filter((e) => e.id !== id);

export {
  addInvited,
  addInviter,
  turnInviterIntoFriend,
  turnInvitedIntoFriend,
  deleteInvited,
  deleteInviter,
};
