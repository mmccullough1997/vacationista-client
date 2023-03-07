import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const updateUser = (userObj, user) => new Promise((resolve, reject) => {
  const newUserObj = {
    first_name: userObj.firstName,
    last_name: userObj.lastName,
    username: userObj.username,
    date_registered: userObj.dateRegistered,
    uid: user.uid,
    bio: userObj.bio,
    image: userObj.image,
  };
  fetch(`${dbUrl}/users/${user.id}`, {
    method: 'PUT',
    body: JSON.stringify(newUserObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(resolve)
    .catch(reject);
});

const getSingleUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${userId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        uid: data.uid,
        firstName: data.first_name,
        lastName: data.last_name,
        dateRegistered: data.date_registered,
        username: data.username,
        bio: data.bio,
        image: data.image,
      });
    }).catch((error) => reject(error));
});

export { updateUser, getSingleUser };
