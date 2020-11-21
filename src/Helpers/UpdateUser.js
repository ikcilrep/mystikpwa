import axios from "axios";
import { serverAddress } from "../settings.json";

const mapIds = (entities) => entities.map((entity) => entity.id);
const removeIds = (entities, ids) =>
  entities.filter((entity) => !ids.contains(entity.id));

const userToIdsObject = (user) => {
  const idsObject = {};
  idsObject.friendsIds = mapIds(user.friends);
  idsObject.invitedIds = mapIds(user.invited);
  idsObject.invitersIds = mapIds(user.inviters);
  idsObject.conversationIds = mapIds(user.conversations);
  idsObject.conversationMembersIds = mapIds(
    user.conversations.flatMap((c) => c.members)
  );
  idsObject.conversationManagersIds = mapIds(
    user.conversations.flatMap((c) => c.managers)
  );
  return idsObject;
};

const removeEntitiesWithIds = (user, idsObject) => {
  user.friends = removeIds(user.friends, idsObject.friendsIds);
  user.invited = removeIds(user.invited, idsObject.invitedIds);
  user.inviters = removeIds(user.inviters, idsObject.inviterIds);
  user.conversations = removeIds(user.conversations, idsObject.conversationIds);
  user.conversations.forEach((conversation) => {
    conversation.members = removeIds(
      conversation.members,
      idsObject.conversationMembersIds
    );
    conversation.managers = removeIds(
      conversation.managers,
      idsObject.conversationManagersIds
    );
  });
};

const getCommonConversations = (user1, user2) =>
  user1.conversations.filter((c1) =>
    user2.conversations.some((c2) => c2.id === c1.id)
  );

const excludeEntities = (entities, entitiesToExclude) =>
  entities.filter((c) => !mapIds(entitiesToExclude).contains(c.id));

const concatConversationsFields = (conversation1, conversation2) => {
  const concatedConversations = {
    ...conversation1,
  };

  concatedConversations.messages = conversation1.messages.concat(
    conversation2.messages
  );
  concatedConversations.members = conversation1.members.concat(
    conversation2.members
  );
  concatedConversations.managers = conversation1.managers.concat(
    conversation2.managers
  );

  return concatedConversations;
};

const concatConversations = (user1, user2) => {
  const commonConversations = getCommonConversations(user1, user2);
  const concatedConversations = excludeEntities(
    user1.conversations.concat(user2.conversations),
    commonConversations
  );

  commonConversations.forEach((conversation1) => {
    const conversation2 = user2.conversations.find(
      (c2) => c2.id === conversation1.id
    );

    concatedConversations.push(
      concatConversationsFields(conversation1, conversation2)
    );
  });

  return concatedConversations;
};

const concatUsers = (user1, user2) => {
  const concatedUser = { ...user1 };
  concatedUser.friends = user1.friends.concat(user2.friends);
  concatedUser.invited = user1.invited.concat(user2.invited);
  concatedUser.inviters = user1.inviters.concat(user2.inviters);
  concatedUser.conversations = concatConversations(user1, user2);
  return concatedUser;
};

const updateUser = async (user) => {
  const updateTime = new Date().toISOString();
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  if (user.lastUpdate !== undefined) {
    const response = await axios.post(
      `${serverAddress}/users/removed/${user.id}`,
      userToIdsObject(user),
      config
    );

    const entitiesToRemove = response.data;
    removeEntitiesWithIds(user, entitiesToRemove);
  }
  try {
    const body =
      user.lastUpdate === undefined ? {} : { since: user.lastUpdate };

    const response = await axios.post(
      `${serverAddress}/users/${user.id}`,
      body,
      config
    );
    const updatedUser = response.data;
    updatedUser.token = user.token;
    updatedUser.expirationDate = user.expirationDate;
    updatedUser.lastUpdate = updateTime;

    if (user.lastUpdate !== undefined) {
      console.log(concatUsers(updatedUser, user));
      return concatUsers(updatedUser, user);
    }
    return updatedUser;
  } catch (err) {
    console.log(err);
  }
};

export default updateUser;