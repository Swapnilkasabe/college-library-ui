import { APIURL } from "../utilities/constants";
import { getToken } from "../utilities/helper";
import { deleteCall, getCall, postCall, putCall } from "./Service";

// Function to handle fetch students
export const getAllStudents = async () =>
  await getCall(`${APIURL}/students`, getToken()).then((res) => res);

// Function to handle fetch student by ID
export const getStudentById = async (id) =>
  await getCall(`${APIURL}/students/${id}`, getToken()).then((res) => res);

// Function to handle create student
export const createStudent = async (newStudent) => {
  const response = await postCall(`${APIURL}/students`, getToken(), newStudent);

  return response;
};

// Function to handle update student by ID
export const updateStudent = async (id, updatedStudentData) => {
  const response = await putCall(
    `${APIURL}/students/${id}`,
    getToken(),
    updatedStudentData
  );
  return response;
};

// Function to handle delete student
export const deleteStudent = async (id) => {
  const response = await deleteCall(`${APIURL}/students/${id}`, getToken());
  return response;
};
