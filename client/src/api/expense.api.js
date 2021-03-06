import axios from "axios";

export const saveExpenseApi = (expense) => {
    return axios.post('/expenses', expense);
}

export const updateExpenseApi = (id, expense) => {
    return axios.put(`/expenses/${id}`, expense);
}

export const deleteExpenseApi = id => {
    return axios.delete(`/expenses/${id}`);
}

export const retrieveExpensesApi = (url) => {
    return axios.get(url);
}