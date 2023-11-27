import axios from "axios";

const apiBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth`;
const frontendBaseUrl = `${process.env.NEXT_PUBLIC_FE_URL}`;

export const registerUser = (email, password, controller) => {
  const registrationUrl = `${apiBaseUrl}/register`;
  const registrationBody = {
    email,
    password,
    role_id: 1,
    link_direct: `${frontendBaseUrl}/verify`,
  };
  return axios.post(registrationUrl, registrationBody, {
    signal: controller.signal,
  });
};

export const verifyUser = (otp, email, controller) => {
  const verificationUrl = `${apiBaseUrl}/verify/${email}`;
  const verificationBody = { otp };
  return axios.patch(verificationUrl, verificationBody, {
    signal: controller.signal,
  });
};

export const loginUser = (email, password) => {
  const loginUrl = `${apiBaseUrl}`;
  return axios({
    method: "post",
    url: loginUrl,
    data: { email, password },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const initiatePasswordReset = (email, controller) => {
  const resetUrl = `${apiBaseUrl}/forgot`;
  const resetBody = { email, link_direct: `${frontendBaseUrl}/reset-password` };
  return axios.patch(resetUrl, resetBody, {
    signal: controller.signal,
  });
};

export const resetPassword = (otp, newPassword, confirmPassword, controller) => {
  const passwordResetUrl = `${apiBaseUrl}/reset-password/${otp}`;
  const passwordResetBody = { newPassword, confirmPassword };
  return axios.patch(passwordResetUrl, passwordResetBody, {
    signal: controller.signal,
  });
};

export const userLogout = (token, controller) => {
  const logoutUrl = `${apiBaseUrl}/logout`;
  const logoutBody = null;
  const logoutConfig = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.patch(logoutUrl, logoutBody, logoutConfig);
};
