import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getAllArticles = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/articles`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleArticle = (articleId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/articles/${articleId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: Number(data.id),
        title: data.title,
        datePosted: data.date_posted,
        content: data.content,
        image: data.image,
        thumbnail: data.thumbnail,
      });
    }).catch((error) => reject(error));
});

export { getAllArticles, getSingleArticle };
