// http-service.js
import axios from 'axios';

// Create an instance of axios with default settings
const httpService = axios.create({
    baseURL: 'https://dummyjson.com', // Set base URL for the API
    timeout: 5000, // Set timeout for requests
});

// Add a request interceptor
httpService.interceptors.request.use(
    (config) => {
        // Get the access token from local storage or wherever you store it
        const accessToken = localStorage.getItem('token'); // Adjust if using a different storage method
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; // Add token to headers if it exists
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
httpService.interceptors.response.use(
    (response) => {
        // Handle successful responses
        return response.data; // Return only the data portion of the response
    },
    (error) => {
        // Handle errors
        if (error.response) {
            // The request was made, and the server responded with a status code
            console.error('Error Response:', error.response.data);
            return Promise.reject(error.response.data); // Reject with error data
        } else {
            console.error('Error:', error.message);
            return Promise.reject(error.message); // Reject with error message
        }
    }
);

export default httpService;
