import axios from "axios";

export const saveExpenseApi = (expense) =>{
    return axios.post('/expenses', expense);
}

export const retrieveExpensesApi = (url) =>{
    return axios.get(url);
}