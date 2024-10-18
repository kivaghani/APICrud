import axios from 'axios';

const httpService = axios.create({
    baseURL : 'https://dummyjson.com',
    timeout : 5000,
});



httpService.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token'); 
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

httpService.interceptors.response.use(
    (response) => {
        return response.data; 
    },
    (error) => {
        if (error.response) {
            console.error('Error Response:', error.response.data);
            return Promise.reject(error.response.data); 
        } else {
            console.error('Error:', error.message);
            return Promise.reject(error.message); 
        }
    }
);

export default httpService;
