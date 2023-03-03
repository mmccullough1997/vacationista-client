import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getAllExpenseTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/expensetypes`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export default getAllExpenseTypes;
