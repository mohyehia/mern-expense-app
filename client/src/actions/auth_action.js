import {AUTH_ATTEMPTING, AUTH_FAILED, AUTH_SUCCESS, USER_LOGOUT} from "./types";
import {userLoginApi} from "../api/user.api";

const TOKEN_NAME = 'expense_app_token';
export const login = (request_data) =>{
    return async function (dispatch) {
        dispatch(loginRequest());
        await userLoginApi(request_data)
            .then(response =>{
                dispatch(loginSuccess(response.data.token));
            })
            .catch(err =>{
                dispatch(loginFailed(err.response.data.message));
            });
    }
}

export const checkAuthentication = () =>{
    return function (dispatch) {
        const token = localStorage.getItem(TOKEN_NAME);
        if(token === null || token === undefined){
            return dispatch(loginFailed('You need to login!'));
        }
        return dispatch(loginSuccess(token));
    }
}

export const logout = () =>{
    localStorage.clear();
    return {
        type: USER_LOGOUT
    }
}

const loginRequest = () =>{
    return {
        type: AUTH_ATTEMPTING
    }
}

const loginSuccess = (token) =>{
    localStorage.setItem(TOKEN_NAME, token);
    return {
        type: AUTH_SUCCESS
    }
}

const loginFailed = (error) =>{
    return {
        type: AUTH_FAILED,
        payload: error
    }
}