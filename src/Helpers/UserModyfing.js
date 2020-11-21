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

export { inviteUser, receiveInvitation };
