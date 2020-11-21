import axios from "axios";
import { serverAddress } from "../settings.json";

const getAuthorizedConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const fetchUserPublicData = async (id, token) => {
  const response = await axios.get(
    `${serverAddress}/users/public/${id}`,
    getAuthorizedConfig(token)
  );

  return response.data;
};

const fetchUser = async ({ id, token, lastUpdate }) => {
  const body = lastUpdate === undefined ? {} : { since: lastUpdate };

  const response = await axios.post(
    `${serverAddress}/users/${id}`,
    body,
    getAuthorizedConfig(token)
  );

  return response.data
};

export { fetchUserPublicData, fetchUser, getAuthorizedConfig };
