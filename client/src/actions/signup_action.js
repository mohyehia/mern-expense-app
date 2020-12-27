import {userRegistrationApi} from "../api/user.api";
import {SIGNUP_FAILED, SIGNUP_REQUEST, SIGNUP_SUCCESS} from "./types";

export const signup = (user_date) => {
    return async function (dispatch) {
        dispatch(signupRequest());
        await userRegistrationApi(user_date)
            .then(response => {
                dispatch(signupSuccess(response.data.message));
            })
            .catch(err => {
                dispatch(signupFailed(err.response.data.error));
            });
    }
}

const signupRequest = () => {
    return {
        type: SIGNUP_REQUEST
    }
}

const signupSuccess = (message) => {
    return {
        type: SIGNUP_SUCCESS,
        payload: message
    }
}

const signupFailed = (error) => {
    return {
        type: SIGNUP_FAILED,
        payload: error
    }
}