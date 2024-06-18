import { APIURL } from "../utilities/constants";
import { getToken } from "../utilities/helper";
import { getCall, postCall } from "./Service";

// Function to handle user login
export const userLogin = async (loginData) => {
  const response = await postCall(
    `${APIURL}/users/login`,
    getToken(false),
    loginData
  );
  return response;
};
// Function to handle user signup
export const userSignup = async (signupData) => {
  const response = await postCall(
    `${APIURL}/users/signup`,
    getToken(false),
    signupData
  );
  return response;
};

// Function to check if email exists
export const checkEmailExists = async (checkEmailData) => {
  const response = await postCall(
    `${APIURL}/users/check-email`,
    getToken(false),
    checkEmailData
  );
  return response;
};

// Function to handle password reset
export const passwordReset = async (passwordResetData) => {
  const response = await postCall(
    `${APIURL}/users/reset-password`,
    getToken(false),
    passwordResetData
  );
  return response;
};

// Function to fetch user details
export const fetchUserDetails = async () =>
  await getCall(`${APIURL}/users/profile`, getToken()).then((res) => res);
