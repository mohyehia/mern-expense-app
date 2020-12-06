import {AUTH_ATTEMPTING, AUTH_FAILED, AUTH_SUCCESS} from "../actions/types";

const INITIAL_STATE = {
    attempting: false,
    isAuth: false,
    profile: {},
    error: ''
}

const authReducer =(state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case AUTH_ATTEMPTING:
            return {
                ...state,
                attempting: true,
                isAuth: false,
                error: ''
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                attempting: false,
                isAuth: true,
                error: ''
            }
        case AUTH_FAILED:
            return {
                ...state,
                attempting: false,
                isAuth: false,
                error: action.payload
            }
        default:
            return state;
    }
}
export default authReducer;