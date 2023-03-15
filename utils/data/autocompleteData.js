import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getAutocompleteFromRecommendations = (theLocation) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/autocomplete/${theLocation}`).then((response) => {
    const locationArray = Object.values(response.data.features);
    const returnArray = locationArray.map((location) => ({
      value: `${location.properties.city}, ${location.properties.country}`,
      label: `${location.properties.city}, ${location.properties.state}, ${location.properties.country}`,
      name: 'autoFromLocation',
      city: location.properties.city,
    }));
    resolve(returnArray);
  }).catch(reject);
});

const getAutocompleteToRecommendations = (theLocation) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/autocomplete/${theLocation}`).then((response) => {
    const locationArray = Object.values(response.data.features);
    const returnArray = locationArray.map((location) => ({
      value: `${location.properties.city}, ${location.properties.country}`,
      label: `${location.properties.city}, ${location.properties.state}, ${location.properties.country}`,
      name: 'autoToLocation',
      city: location.properties.city,
    }));
    resolve(returnArray);
  }).catch(reject);
});

export { getAutocompleteFromRecommendations, getAutocompleteToRecommendations };
