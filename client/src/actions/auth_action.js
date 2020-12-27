import {AUTH_ATTEMPTING, AUTH_FAILED, AUTH_SUCCESS, PROFILE_FETCHED, USER_LOGOUT} from "./types";
import {fetchProfileApi, userLoginApi} from "../api/user.api";
import setAuthHeader from "../api/setAuthHeader";

const TOKEN_NAME = 'expense_app_token';
export const login = (request_data) =>{
    return async function (dispatch) {
        dispatch(loginRequest());
        await userLoginApi(request_data)
            .then(response =>{
                const token = response.data.token;
                setAuthHeader(token);
                dispatch(fetchProfile());
                dispatch(loginSuccess(token));
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
            return dispatch(loginFailed(''));
        }
        setAuthHeader(token);
        dispatch(fetchProfile());
        return dispatch(loginSuccess(token));
    }
}

export const fetchProfile = () =>{
    return async function (dispatch) {
        await fetchProfileApi()
            .then(response =>{
                dispatch({
                    type: PROFILE_FETCHED,
                    payload: response.data.user
                })
            })
            .catch(e =>{
                console.error(e)
            });
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