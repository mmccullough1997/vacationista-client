import firebase from 'firebase/app';
import 'firebase/auth';
import { clientCredentials } from './client';

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/checkuser`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => (
      resolve(response.json())
    ))
    .catch(reject);
});

const registerUser = (user, userInfo) => new Promise((resolve, reject) => {
  const userObj = {
    uid: user.uid,
    first_name: userInfo?.firstName,
    last_name: userInfo?.lastName,
    date_registered: new Date(new Date().setDate(new Date().getDate())).toISOString().substring(0, 10),
    username: userInfo?.username,
    bio: userInfo?.bio,
    image: userInfo?.image,
  };
  fetch(`${clientCredentials.databaseURL}/register`, {
    method: 'POST',
    body: JSON.stringify(userObj),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn,
  signOut,
  checkUser,
  registerUser,
};
