import { addInviter, deleteInviter } from "./Helpers/UserModyfing";
import { fetchUserPublicData } from "./Helpers/DataFetching";

const receiveInvitation = (user, setUser) => (inviterId) => {
  fetchUserPublicData(inviterId, user.token).then((inviter) => {
    addInviter({ inviter, user, setUser });
  });
};

const deleteInvitation = (user, setUser) => (inviterId) => {
  console.log(inviterId);
  deleteInviter({ inviterId, user, setUser });
};

export { receiveInvitation, deleteInvitation };
