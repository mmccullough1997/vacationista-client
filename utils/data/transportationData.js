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

const updateTransportation = (transportation, transportationId) => new Promise((resolve, reject) => {
  const transportationObj = {
    transportation_type: transportation.transportationType,
    trip: transportation.trip,
    leg: transportation.leg,
    travel_from: transportation.travelFrom,
    travel_to: transportation.travelTo,
    amount: transportation.amount,
    comment: transportation.comment,
    round_trip: transportation.roundTrip,
  };
  fetch(`${dbUrl}/transportations/${transportationId}`, {
    method: 'PUT',
    body: JSON.stringify(transportationObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const createTransportation = (transportation) => new Promise((resolve, reject) => {
  const transportationObj = {
    transportation_type: transportation.transportationType,
    trip: transportation.trip,
    leg: transportation.leg,
    travel_from: transportation.travelFrom,
    travel_to: transportation.travelTo,
    amount: transportation.amount,
    comment: transportation.comment,
    round_trip: transportation.roundTrip,
  };
  fetch(`${dbUrl}/transportations`, {
    method: 'POST',
    body: JSON.stringify(transportationObj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteTransportation = (transportationId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/transportations/${transportationId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getAllTransportationsByTrip, getAllTransportationsByLeg,
  updateTransportation,
  createTransportation,
  deleteTransportation,
};
