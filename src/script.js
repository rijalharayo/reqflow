/**
 * @typedef {Object} ApiResponse
 * @property {Object} headers - Response headers from the server
 * @property {Object} main
 * @property {number} main.status - HTTP status code
 * @property {string} main.message - Success message or error description
 * @property {any} main.body - Response payload (data on success, error details on failure, or null)
 */

const axios = require("axios");

let api;

/**
 * Creates a configured Axios instance for all subsequent requests.
 * Must be called once before using get/post/put/patch/delete.
 *
 * @param {string} baseURL - The base URL for all API requests (e.g., "https://api.example.com")
 * @param {Object} [config={}] - Optional Axios configuration overrides (headers, timeout, etc.)
 * @returns {void}
 */
function createApiApp(baseURL, config = { }) {
     api = axios.create({
          baseURL: baseURL,
          ...config
     });
}

// Helper to format error responses
function formatError(err) {
     const status = err.response?.status || 0;

     // 5xx server errors
     if (status >= 500) {
          return {
               headers: {},
               main: {
                    status,
                    message: "Something went wrong. Please try again later.",
                    body: null
               }
          };
     }

     // 4xx client errors or other status codes
     return {
          headers: {},
          main: {
               status,
               message: err.response?.data?.message || err.message || "Unknown error",
               body: err.response?.data || {}
          }
     };
}
/**
 * Performs a GET request.
 *
 * @param {Object} options
 * @param {string} options.route - The endpoint route (e.g., "/users" or "/users/123")
 * @param {Object<string, string|number>} [options.data] - Query parameters as an object (automatically converted to ?key=value)
 * @param {Object} [options.config={}] - Optional Axios config (headers, etc.)
 * 
 * @returns {Promise<ApiResponse>} A response object
 */
// Generic GET
const get = async ({ data = null, route, config = {} }) => {
     if(api) {
          const queryParam = data != null ? new URLSearchParams(data).toString() : "";
          const newRoute = `${route}?${queryParam}`;
          try {
               const response = await api.get(newRoute, config);
               return { headers: response.headers, main: { status: response.status, message: "Success", body: response.data } };
          } 
          catch (err) {
               return formatError(err);
          }
     }
     else {
          console.error("No api app created!, try creating one using createApiApp() in the root file");
     }
};

/**
 * Performs a POST request.
 * @param {Object} options
 * @param {string} options.route - The endpoint route
 * @param {any} [options.data] - Request body (usually an object, will be JSON stringified)
 * @param {Object} [options.config={ withCredentials: true }] - Optional Axios config
 * 
 * @returns {Promise<ApiResponse>} A response object
 */
// Generic POST
const post = async ({route, data, config = { withCredentials: true } }) => {
     if(api) {
          try {
               const response = await api.post(route, data, config);
               return { headers: response.headers, main: { status: response.status, message: "Success", body: response.data } };
          } 
          catch (err) {
               return formatError(err);
          }
     }
     else {
          console.error("No api app created!, try creating one using createApiApp() in the root file");
     }
};

/**
 * Performs a PUT request (full resource replacement).
 *
 * @param {Object} options
 * @param {string} options.route - The endpoint route
 * @param {any} [options.data] - Request body
 * @param {Object} [options.config={}] - Optional Axios config
 *
 * @returns {Promise<ApiResponse>} - A response object
 *   
 */
// Generic PUT
const put = async ({ route, data, config = {} }) => {
     if(api) {
          try {
               const response = await api.put(route, data, config);
               return { headers: response.headers, main: { status: response.status, message: "Success", body: response.data } };
          } 
          catch (err) {
               return formatError(err);
          }
     }
     else {
          console.error("No api app created!, try creating one using createApiApp() in the root file");
     }
};

/**
 * Performs a DELETE request.
 *
 * @param {Object} options
 * @param {string} options.route -- The endpoint route
 * @param {Object} [options.config={ withCredentials: true }] -- Optional Axios config
 * 
 * @returns {Promise<ApiResponse>}  A response object
 */
// Generic DELETE
const remove = async ({ route, config = { withCredentials: true } }) => {
     if(api) {
          try {
               const response = await api.delete(route, config);
               return { headers: response.headers, main: { status: response.status, message: "Success", body: response.data } };
          } 
          catch (err) {
               return formatError(err);
          }
     }
     else {
          console.error("No api app created!, try creating one using createApiApp() in the root file");
     }
};

/**
 * Performs a PATCH request (partial resource update).
 *
 * @param {Object} options
 * @param {string} options.route - The endpoint route (e.g., "/users/123" or "/settings")
 * @param {any} [options.data] - Partial update data to send in the request body (usually an object)
 * @param {Object} [options.config={ withCredentials: true }] - Optional Axios configuration (headers, timeout, etc.)
 * 
 * @returns {Promise<ApiResponse>} A response object
*/
const patch = async ({ route, data, config = { withCredentials: true } }) => {
     if(api) {
          try {
               const response = await api.patch(route, data, config);
               return { headers: response.headers, main: { status: response.status, message: "Success", body: response.data } };
          } 
          catch (err) {
               return formatError(err);
          }
     }
     else {
          console.error("No api app created!, try creating one using createApiApp() in the root file");
     }
};

module.exports = {
     createApiApp,
     get,
     post,
     put,
     delete: remove,
     patch
};
