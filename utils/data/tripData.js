import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getUpcomingTripsByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/trips?user=${userId}&upcoming=true`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getAllTripsByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/trips?user=${userId}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export { getUpcomingTripsByUser, getAllTripsByUser };
