const inviteUser = ({ invitedUser, user, setUser }) => {
  const userCopy = { ...user };
  userCopy.invited.push(invitedUser);
  setUser(userCopy);
};

const receiveInvitation = ({ inviter, user, setUser }) => {
  const userCopy = { ...user };
  userCopy.inviters.push(inviter);
  setUser(userCopy);
};

const deleteInvitation = ({ invitedUser, user, setUser }) => {
  const userCopy = { ...user };
  userCopy.invited = userCopy.invited.filter((i) => i.id !== invitedUser.id);
  setUser(userCopy);
};

const acceptInvitation = ({ inviter, user, setUser }) => {
  const userCopy = { ...user };
  userCopy.inviters = userCopy.inviters.filter((i) => i.id !== inviter.id);
  userCopy.friends.push(inviter);
  setUser(userCopy);
};

export { inviteUser, receiveInvitation, acceptInvitation, deleteInvitation };
