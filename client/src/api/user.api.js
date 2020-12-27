import axios from "axios";

export const userLoginApi = (request_data) =>{
    return axios.post('users/login', request_data)
}

export const fetchProfileApi = () =>{
    return axios.get('users/me');
}

export const userRegistrationApi = (user_data) =>{
    return axios.post('users/signup', user_data);
}