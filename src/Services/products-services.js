import axios from 'axios';
import httpService from './http-service';

const endPointBaseURL = 'https://dummyjson.com';


const prodcuts = async (requestBody) => {
    return httpService.get(`${endPointBaseURL}/products`, requestBody);
}
export default {
    prodcuts,
    // forgotPassword,
    // verifyOtp,
    // changePassword
}