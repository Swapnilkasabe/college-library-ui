const localStorageService = {
  // Method to get an item from localStorage by key
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting item from local storage:", error);
      return null;
    }
  },

  // Method to set an item in localStorage
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting item in local storage:", error);
    }
  },

  // Method to remove an item from localStorage by key
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from local storage:", error);
    }
  },

  // Method to clear all items from localStorage
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing local storage:", error);
    }
  },
};

export default localStorageService;
