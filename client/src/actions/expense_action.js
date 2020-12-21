import {saveExpenseApi} from "../api/expense.api";
import {EXPENSE_SAVED, RESET_SAVED_FLAG} from "./types";
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

export const resetSavedFlag = () =>{
    return {
        type: RESET_SAVED_FLAG
    }
}