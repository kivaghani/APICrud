import axios from 'axios';
import httpService from './http-service';

const endPointBaseURL = 'https://dummyjson.com';


const loginUser = async (requestBody) => {
    console.log('Login Request:', requestBody);
    return httpService.post(`${endPointBaseURL}/auth/login`, requestBody);
}

export default {
    loginUser,
}