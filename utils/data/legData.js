import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getAllLegsByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/legs?user=${userId}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getSingleUserLeg = (legId, userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/legs/${legId}?user=${userId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        user: userId,
        start: data.start,
        end: data.end,
        location: data.location,
        budget: data.budget,
        events: data.events,
      });
    }).catch((error) => reject(error));
});

const getSingleLeg = (legId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/legs/${legId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        user: data.user,
        start: data.start,
        end: data.end,
        location: data.location,
        events: data.events,
      });
    }).catch((error) => reject(error));
});

export {
  getAllLegsByUser, getSingleUserLeg, getSingleLeg,
};
