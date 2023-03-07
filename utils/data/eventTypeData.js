import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getAllEventTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/eventtypes`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export default getAllEventTypes;
