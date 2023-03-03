import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getAllTransportationTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/transportationtypes`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export default getAllTransportationTypes;
