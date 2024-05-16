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
      case 400:
        throw new Error(`Bad request: ${errorData.message}`);
      case 401:
        throw new Error(`Unauthorized: ${errorData.message}`);
      case 403:
        throw new Error(`Forbidden: ${errorData.message}`);
      case 404:
        throw new Error(`Not found: ${errorData.message}`);
      default:
        throw new Error(`Error: ${errorData.message}`);
    }
  }
  // Return parsed JSON response body if response is okay
  return response.json();
};

export default customErrorHandler;
