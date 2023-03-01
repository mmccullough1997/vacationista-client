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

const updateLeg = (leg, legId) => new Promise((resolve, reject) => {
  const legObj = {
    user: leg.user,
    start: leg.start,
    end: leg.end,
    location: leg.location,
    budget: leg.budget,
  };
  fetch(`${dbUrl}/legs/${legId}`, {
    method: 'PUT',
    body: JSON.stringify(legObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getAllLegsByUser, getSingleUserLeg, getSingleLeg, updateLeg,
};
