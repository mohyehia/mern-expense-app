import {combineReducers} from "redux";
import authReducer from "./auth_reducer";
import expenseReducer from "./expense_reducer";
import errorReducer from "./error_reducer";
import signupReducer from "./signup_reducer";

const rootReducer =combineReducers({
    auth: authReducer,
    expense: expenseReducer,
    signup: signupReducer,
    errors: errorReducer
});

export default rootReducer;