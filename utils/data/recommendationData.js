import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getRecommendations = (location) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/locations/${location}`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getRecommendations;
