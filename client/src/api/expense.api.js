import axios from "axios";

export const saveExpenseApi = (expense) =>{
    return axios.post('/expenses', expense);
}

export const retrieveExpensesApi = () =>{
    return axios.get('/expenses');
}