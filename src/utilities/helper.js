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
