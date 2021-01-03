import {deleteExpenseApi, retrieveExpensesApi, saveExpenseApi, updateExpenseApi} from "../api/expense.api";
import {
    EXPENSE_SAVED,
    EXPENSE_UPDATED,
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

export const fetchExpenses = (month) => {
    return async function (dispatch) {
        dispatch({
            type: FETCHING_EXPENSES
        });
        const prefix = '/expenses';
        const url = month ? `${prefix}/${month}` : prefix;
        console.log('url =>' + url);
        await retrieveExpensesApi(url)
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

export const updateExpense = (id, expense) => {
    return async function (dispatch) {
        dispatch(clearErrorMessage());
        await updateExpenseApi(id, expense)
            .then(response => {
                console.log(response.data);
                dispatch({type: EXPENSE_UPDATED});
            })
            .catch(err => {
                console.log(err);
                dispatch(addErrorMessage(err));
            });
    }
}

export const deleteExpense = (id) => {
    return async function (dispatch) {
        dispatch(clearErrorMessage());
        await deleteExpenseApi(id)
            .then(response => {
                console.log(response.data);
                dispatch(fetchExpenses());
            })
            .catch(err => {
                console.log(err);
                dispatch(addErrorMessage(err));
            });
    }
}

export const resetSavedFlag = () => {
    return {
        type: RESET_SAVED_FLAG
    }
}