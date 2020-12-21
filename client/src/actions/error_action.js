import {ADD_ERROR, CLEAR_ERRORS} from "./types";

export const addErrorMessage = err =>{
    const error = err.response.data.error;
    return {
        type: ADD_ERROR,
        payload: error
    }
}

export const clearErrorMessage = () =>{
    return {
        type: CLEAR_ERRORS
    }
}