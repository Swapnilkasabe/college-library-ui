import localStorageService from "../services/localStorageService";
import { HEADERS } from "./constants";

export const isEmptyString = (str) =>
  str === undefined || str === null || str.trim().length < 1;

export const getToken = (isAuthRequire = true) => {
  return isAuthRequire
    ? {
        ...HEADERS,
        Authorization: `Bearer ${localStorageService.get("token")}`,
      }
    : {
        ...HEADERS,
      };
};

export const formatDate = (dateString) => {
  try {
    const dateObject = new Date(dateString);

    return dateObject.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch (error) {
    return "Invalid Date";
  }
};
