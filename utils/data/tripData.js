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

export {
  getUpcomingTripsByUser, getAllTripsByUser, getSingleUserTrip, getSingleTrip,
};
