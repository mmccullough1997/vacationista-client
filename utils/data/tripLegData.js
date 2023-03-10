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

const deleteTripLeg = (tripLegId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/triplegs/${tripLegId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const updateTripLeg = (tripLeg, tripLegId) => new Promise((resolve, reject) => {
  const tripLegObj = {
    trip: tripLeg.trip,
    leg: tripLeg.leg,
  };
  fetch(`${dbUrl}/trips/${tripLegId}`, {
    method: 'PUT',
    body: JSON.stringify(tripLegObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const getSingleTripLeg = (tripLegId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/triplegs/${tripLegId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        trip: data.trip,
        leg: data.leg,
      });
    }).catch((error) => reject(error));
});

const getAllTripLegsByTripAndLeg = (tripId, legId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/triplegs?trip=${tripId}&leg=${legId}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export {
  createTripLeg, getAllTripLegsByTrip, deleteTripLeg, updateTripLeg, getSingleTripLeg, getAllTripLegsByTripAndLeg,
};
