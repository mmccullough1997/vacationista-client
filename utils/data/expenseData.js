import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getAllExpensesByTrip = (tripId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/expenses?trip=${tripId}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getAllExpensesByLeg = (legId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/expenses?leg=${legId}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const updateExpense = (expense, expenseId) => new Promise((resolve, reject) => {
  const expenseObj = {
    expense_type: expense.expenseType,
    trip: expense.trip,
    leg: expense.leg,
    amount: expense.amount,
    comment: expense.comment,
    title: expense.title,
  };
  fetch(`${dbUrl}/expenses/${expenseId}`, {
    method: 'PUT',
    body: JSON.stringify(expenseObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const createExpense = (expense) => new Promise((resolve, reject) => {
  const expenseObj = {
    expense_type: expense.expenseType,
    trip: expense.trip,
    leg: expense.leg,
    amount: expense.amount,
    comment: expense.comment,
    title: expense.title,
  };
  fetch(`${dbUrl}/expenses`, {
    method: 'POST',
    body: JSON.stringify(expenseObj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

export {
  getAllExpensesByTrip, getAllExpensesByLeg, updateExpense, createExpense,
};
