import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getAutocompleteRecommendations = (location) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/autocomplete/${location}`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getAutocompleteRecommendations;
