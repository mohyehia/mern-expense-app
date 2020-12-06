import axios from "axios";

export const userLoginApi = (request_data) =>{
    return axios.post('users/login', request_data)
}