import {retrieveExpensesApi, saveExpenseApi} from "../api/expense.api";
import {
    EXPENSE_SAVED,
    EXPENSES_FETCHED_SUCCESSFULLY,
    FETCHING_EXPENSES,
    FETCHING_EXPENSES_FAILED,
    RESET_SAVED_FLAG
} from "./types";
import {addErrorMessage, clearErrorMessage} from "./error_action";

export const saveExpense = expense => {
    return async function (dispatch) {
        dispatch(clearErrorMessage());
        await saveExpenseApi(expense)
            .then(response => {
                console.log(response.data);
                dispatch({type: EXPENSE_SAVED});
            })
            .catch(err => {
                console.log(err);
                dispatch(addErrorMessage(err));
            });
    }
}

export const fetchExpenses = () => {
    return async function (dispatch) {
        dispatch({
            type: FETCHING_EXPENSES
        });
        await retrieveExpensesApi()
            .then(response => {
                console.log(response.data);
                dispatch({
                    type: EXPENSES_FETCHED_SUCCESSFULLY,
                    payload: response.data.expenses
                })
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: FETCHING_EXPENSES_FAILED
                })
                dispatch(addErrorMessage(err));
            })
    }
}

export const resetSavedFlag = () => {
    return {
        type: RESET_SAVED_FLAG
    }
}