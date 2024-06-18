import customErrorHandler from "../utilities/customErrorHandler";

// Function to make API calls with error handling
const apiCall = async (url, headers) => {
  try {
    const response = await fetch(url, headers).then(customErrorHandler);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};
// Function to make a GET request
export const getCall = async (url, headers) =>
  await apiCall(url, { method: "GET", headers }).then((res) => res);

// Function to make a POST request
export const postCall = async (url, headers, body) => {
  return await apiCall(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
};

// Function to make a PUT request
export const putCall = async (url, headers, body) => {
  return await apiCall(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });
};

// Function to make a DELETE request
export const deleteCall = async (url, headers) => {
  return await apiCall(url, { method: "DELETE", headers });
};
