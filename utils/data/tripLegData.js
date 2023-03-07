import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const createTripLeg = (tripId, legId) => new Promise((resolve, reject) => {
  const tripLeg = {
    trip: Number(tripId),
    leg: Number(legId),
  };
  fetch(`${dbUrl}/triplegs`, {
    method: 'POST',
    body: JSON.stringify(tripLeg),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getAllTripLegsByTrip = (tripId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/triplegs?trip=${tripId}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export { createTripLeg, getAllTripLegsByTrip };