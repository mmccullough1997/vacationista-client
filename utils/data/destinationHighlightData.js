import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getSingleDestinationHighlight = (destinationHighlightId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/highlights/${destinationHighlightId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: Number(data.id),
        title: data.title,
        content: data.content,
        image: data.image,
        location: data.location,
        thumbnail: data.thumbnail,
      });
    }).catch((error) => reject(error));
});

const getHighlightIdArray = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/highlights`).then((response) => response.json())
    .then((data) => {
      const idList = data.map((highlight) => highlight.id);
      resolve(idList);
    })
    .catch(reject);
});

export { getSingleDestinationHighlight, getHighlightIdArray };
