import {
  addInviter,
  deleteInviter,
  turnInvitedIntoFriend,
} from "./Helpers/UserModyfing";
import { fetchUserPublicData } from "./Helpers/DataFetching";

const receiveInvitation = (user, setUser) => (inviterId) => {
  fetchUserPublicData(inviterId, user.token).then((inviter) => {
    addInviter({ inviter, user, setUser });
  });
};

const deleteInvitation = (user, setUser) => (inviterId) => {
  deleteInviter({ inviterId, user, setUser });
};

const addFriend = (user, setUser) => (invitedId) => {
  fetchUserPublicData(invitedId, user.token).then((invited) => {
    turnInvitedIntoFriend({ invited, user, setUser });
  });
};

export { receiveInvitation, deleteInvitation, addFriend };
