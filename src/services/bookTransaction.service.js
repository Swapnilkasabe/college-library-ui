import { APIURL } from "../utilities/constants";
import { getToken } from "../utilities/helper";
import { getCall, postCall, putCall } from "./Service";

// Function to handle fetch trasaction records
export const getAllLendings = async () =>
  await getCall(`${APIURL}/book-transactions`, getToken()).then((res) => res);

// Function to handle fetch trasaction record by ID
export const findLendingById = async (lendingId) =>
  await getCall(`${APIURL}/book-transactions/${lendingId}`, getToken()).then(
    (res) => res
  );

// Function to handle fetch returned book records
export const handleGetAllReturnedBooks = async () =>
  await getCall(`${APIURL}/book-transactions/returned/all`, getToken()).then(
    (res) => res
  );

// Function to handle fetch trasaction record by student ID
export const getTransactionByStudentId = async (studentId) =>
  getCall(`${APIURL}/book-transactions/student/${studentId}`, getToken()).then(
    (response) => response
  );

// Function to handle fetch trasaction record by book ID
export const getTransactionByBookId = async (bookId) =>
  getCall(`${APIURL}/book-transactions/book/${bookId}`, getToken()).then(
    (response) => response
  );

// Function to handle create a new trasaction record
export const createLending = async (lendingData) => {
  const response = await postCall(
    `${APIURL}/book-transactions`,
    getToken(),
    lendingData
  );

  return response;
};

// Function to handle renew trasaction record
export const createRenewal = async (lendingId, newStudent) => {
  const response = await postCall(
    `${APIURL}/book-transactions/${lendingId}/renew`,
    getToken(),
    newStudent
  );

  return response;
};

// Function to handle return book
export const updateReturnedDate = async (lendingId, updatedStudentData) => {
  const response = await putCall(
    `${APIURL}/book-transactions/${lendingId}/return`,
    getToken(),
    updatedStudentData
  );
  return response;
};
