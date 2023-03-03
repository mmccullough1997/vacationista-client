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

export {
  getAllExpensesByTrip, getAllExpensesByLeg,
};
