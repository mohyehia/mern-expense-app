import {RESET_CREATED_FLAG, SIGNUP_FAILED, SIGNUP_REQUEST, SIGNUP_SUCCESS} from "../actions/types";

const INITIAL_STATE = {
    attempting: false,
    created: false,
    message: '',
    error: ''
}

const signupReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {
                ...state,
                attempting: true
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                attempting: false,
                created: true,
                message: action.payload,
                error: ''
            }
        case SIGNUP_FAILED:
            return {
                ...state,
                attempting: false,
                created: false,
                message: '',
                error: action.payload
            }
        case RESET_CREATED_FLAG:
            return {
                ...state,
                created: false
            }
        default:
            return state;
    }
}

export default signupReducer;