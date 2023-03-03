import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getAllTransportationsByTrip = (tripId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/transportations?trip=${tripId}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getAllTransportationsByLeg = (legId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/transportations?leg=${legId}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export {
  getAllTransportationsByTrip, getAllTransportationsByLeg,
};
