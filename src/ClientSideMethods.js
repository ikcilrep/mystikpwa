import User from "./Helpers/UserModyfing";
import { fetchUserPublicData } from "./Helpers/DataFetching";

const receiveInvitation = (user, setUser) => (inviterId) => {
  fetchUserPublicData(inviterId, user.token).then((inviter) => {
    User.addInviter({ inviter, user, setUser });
  });
};

const deleteInvitation = (user, setUser) => (inviterId) => {
  User.deleteInviter({ inviterId, user, setUser });
};

const addFriend = (user, setUser) => (invitedId) => {
  fetchUserPublicData(invitedId, user.token).then((invited) => {
    User.turnInvitedIntoFriend({ invited, user, setUser });
  });
};

const deleteFriend = (user, setUser) => (friendId) => {
  fetchUserPublicData(friendId, user.token).then((friend) => {
    User.deleteFriend({ friend, user, setUser });
  });
};

export { receiveInvitation, deleteInvitation, addFriend, deleteFriend };
