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
        trip: data.trip,
        expenses: data.expenses,
        expenseTotal: data.expense_total,
        transportations: data.transportations,
        transportationTotal: data.transportation_total,
        total: data.total,
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
        trip: data.trip,
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

const deleteLeg = (legId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/legs/${legId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const createLeg = (legObj, user) => new Promise((resolve, reject) => {
  const leg = {
    start: legObj.start,
    end: legObj.end,
    location: legObj.location,
    budget: legObj.budget,
    user: user.id,
  };
  fetch(`${dbUrl}/legs`, {
    method: 'POST',
    body: JSON.stringify(leg),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

export {
  getAllLegsByUser, getSingleUserLeg, getSingleLeg, updateLeg, deleteLeg, createLeg,
};
