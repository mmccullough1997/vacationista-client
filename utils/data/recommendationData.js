// using CORSANYWHERE proxy server - can implement with backend server-side?
const yelpToken = 'UuuiOj7OcEYoAexi8BMLw_FR9BDsNTVOjVMTv00XhrpGkNaPeOK4rSbWZIq95WmddCcM8yGW6_zShxVr54Qx9H3Z-7Yrfe9kZH97I3LnDXwfQzfJ7dA7wnCPkvXqY3Yx';
const yelpUrl = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?';

const getRecommendations = (location, numberOfResults) => new Promise((resolve, reject) => {
  fetch(`${yelpUrl}location=${location}&sort_by=best_match&limit=${numberOfResults}`, {
    headers: {
      Accept: 'application/json',
      'x-requested-with': 'xmlhttprequest',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${yelpToken}`,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getRecommendations;
