import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getUpcomingTripsByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/trips?user=${userId}&upcoming=true`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getPastTripsByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/trips?user=${userId}&upcoming=false`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getAllTripsByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/trips?user=${userId}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getSingleUserTrip = (tripId, userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/trips/${tripId}?user=${userId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        user: userId,
        start: data.start,
        end: data.end,
        travelFrom: data.travel_from,
        travelTo: data.travel_to,
        budget: data.budget,
        events: data.events,
        legs: data.legs,
        expenses: data.expenses,
        expenseTotal: data.expense_total,
        transportations: data.transportations,
        transportationTotal: data.transportation_total,
        total: data.total,
      });
    }).catch((error) => reject(error));
});

const getSingleTrip = (tripId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/trips/${tripId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        user: data.user,
        start: data.start,
        end: data.end,
        travelFrom: data.travel_from,
        travelTo: data.travel_to,
        events: data.events,
        legs: data.legs,
      });
    }).catch((error) => reject(error));
});

const updateTrip = (trip, tripId) => new Promise((resolve, reject) => {
  const tripObj = {
    user: trip.user,
    start: trip.start,
    end: trip.end,
    travel_from: trip.travelFrom,
    travel_to: trip.travelTo,
    budget: trip.budget,
  };
  fetch(`${dbUrl}/trips/${tripId}`, {
    method: 'PUT',
    body: JSON.stringify(tripObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteTrip = (tripId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/trips/${tripId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const createTrip = (tripObj, user) => new Promise((resolve, reject) => {
  const trip = {
    start: tripObj.start,
    end: tripObj.end,
    travel_from: tripObj.travelFrom,
    travel_to: tripObj.travelTo,
    budget: tripObj.budget,
    user: user.id,
  };
  fetch(`${dbUrl}/trips`, {
    method: 'POST',
    body: JSON.stringify(trip),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

export {
  getUpcomingTripsByUser, getPastTripsByUser, getAllTripsByUser, getSingleUserTrip, getSingleTrip, updateTrip, deleteTrip, createTrip,
};
