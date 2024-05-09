// Function to make an API call
const apiCall = async (url, headers) => {
  return await fetch(url, headers).then((response) => response.json());
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
