import { APIURL } from "../utilities/constants";
import { getToken } from "../utilities/helper";
import { deleteCall, getCall, postCall, putCall } from "./Service";

// Function to handle fetch books
export const getAllBooks = async () =>
  await getCall(`${APIURL}/books`, getToken()).then((res) => res);

// Function to handle fetch book by ID
export const getBookById = async (id) =>
  await getCall(`${APIURL}/books/${id}`, getToken()).then((res) => res);

// Function to handle new book creation
export const createBook = async (newBook) => {
  const response = await postCall(`${APIURL}/books`, getToken(), newBook);

  return response;
};

// Function to handle update book
export const updateBook = async (id, updatedBookData) => {
  const response = await putCall(
    `${APIURL}/books/${id}`,
    getToken(),
    updatedBookData
  );
  return response;
};

// Function to handle delete book
export const deleteBook = async (id) => {
  const response = await deleteCall(`${APIURL}/books/${id}`, getToken());
  return response;
};
