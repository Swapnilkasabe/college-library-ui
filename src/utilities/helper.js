import { HEADERS } from "./constants";

export const isEmptyString = (str) =>
  str === undefined || str === null || str.trim().length < 1;

export const getToken = () => {
  return {
    ...HEADERS,
  };
};
