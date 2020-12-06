import {AUTH_ATTEMPTING, AUTH_FAILED, AUTH_SUCCESS} from "./types";
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