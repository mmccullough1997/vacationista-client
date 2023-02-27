import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getYelpRecommendations = (location) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/locations/${location}`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getAdminRecommendations = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/recommendations`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export { getYelpRecommendations, getAdminRecommendations };
