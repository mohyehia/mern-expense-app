import {
    EXPENSE_SAVED,
    EXPENSE_UPDATED,
    EXPENSES_FETCHED_SUCCESSFULLY,
    FETCHING_EXPENSES,
    FETCHING_EXPENSES_FAILED,
    RESET_SAVED_FLAG
} from "../actions/types";

const INITIAL_STATE = {
    saved: false,
    updated: false,
    fetching: false,
    expenses: []
};

const expenseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EXPENSE_SAVED:
            return {
                ...state,
                saved: true
            }
        case EXPENSE_UPDATED:
            return {
                ...state,
                updated: true
            }
        case RESET_SAVED_FLAG:
            return {
                ...state,
                saved: false,
                updated: false
            }
        case FETCHING_EXPENSES:
            return {
                ...state,
                fetching: true
            }
        case EXPENSES_FETCHED_SUCCESSFULLY:
            return {
                ...state,
                fetching: false,
                expenses: action.payload
            }
        case FETCHING_EXPENSES_FAILED:
            return {
                ...state,
                fetching: false
            }
        default:
            return state;
    }
}

export default expenseReducer;