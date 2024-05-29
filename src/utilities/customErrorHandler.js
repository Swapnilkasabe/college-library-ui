import localStorageService from "../services/localStorageService";

const customErrorHandler = async (response) => {
  // Check if the response is not okay (status code not in the 200 range)
  if (!response.ok) {
    let errorData;
    try {
      // Parse the response body as JSON
      errorData = await response.json();
    } catch (error) {
      // Logging an error if parsing fails
      console.error("Error parsing response:", response.statusText);
    }

    // Handle different HTTP (Non 200) status codes with corresponding error messages
    switch (response.status) {
      case 401: {
        localStorageService.clear();
        window.location.href = "/login";
        break;
      }

      default: {
        break;
      }
    }
  }
  // Return parsed JSON response body if response is okay
  return await response.json();
};

export default customErrorHandler;
