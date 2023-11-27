import axios from "axios";

const apiBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

export const fetchProfileData = (token, controller) => {
  const profileUrl = `${apiBaseUrl}/profile`;
  const profileConfig = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.get(profileUrl, profileConfig);
};

export const updateProfileData = (
  firstName,
  lastName,
  phone,
  token,
  controller
) => {
  const profileUrl = `${apiBaseUrl}/profile`;
  const profileBody = { first_name: firstName, last_name: lastName, phone };
  const profileConfig = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.patch(profileUrl, profileBody, profileConfig);
};

export const updatePassword = (passwordBody, token, controller) => {
  const passwordUrl = `${apiBaseUrl}/auth/change-password`;
  const passwordConfig = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.patch(passwordUrl, passwordBody, passwordConfig);
};

export const updateProfileImage = (imageBody, token, controller) => {
  const imageUrl = `${apiBaseUrl}/profile/image`;
  const imageConfig = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.patch(imageUrl, imageBody, imageConfig);
};

export const removeProfileImage = (token, controller) => {
  const deleteImageUrl = `${apiBaseUrl}/profile/delete-image`;
  const deleteImageBody = null;
  const deleteImageConfig = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.patch(deleteImageUrl, deleteImageBody, deleteImageConfig);
};

export const fetchHistories = (token, controller) => {
  const historiesUrl = `${apiBaseUrl}/`;
  const historiesConfig = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.get(historiesUrl, historiesConfig);
};
