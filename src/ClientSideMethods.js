import { addInviter } from "./Helpers/UserModyfing";
import { fetchUserPublicData } from "./Helpers/DataFetching";

const receiveInvitation = (user, setUser) => (inviterId) => {
  fetchUserPublicData(inviterId, user.token).then((inviter) => {
    addInviter({ inviter, user, setUser });
  });
};

export { receiveInvitation };
