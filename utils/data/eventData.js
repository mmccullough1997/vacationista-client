import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getAllEvents = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleEvent = (eventId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events/${eventId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: Number(data.id),
        eventType: data.event_type,
        trip: data.trip,
        leg: data.leg,
        description: data.description,
        location: data.location,
        date: data.date,
        image: data.image,
        title: data.title,
        user: data.user,
      });
    }).catch((error) => reject(error));
});

const updateEvent = (event, eventId) => new Promise((resolve, reject) => {
  const eventObj = {
    event_type: event.eventType,
    trip: event.trip,
    leg: event.leg,
    description: event.description,
    location: event.location,
    date: event.date,
    title: event.title,
    image: event.image,
  };
  fetch(`${dbUrl}/events/${eventId}`, {
    method: 'PUT',
    body: JSON.stringify(eventObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const createEvent = (event) => new Promise((resolve, reject) => {
  const eventObj = {
    event_type: event.eventType,
    trip: event.trip,
    leg: event.leg,
    description: event.description,
    location: event.location,
    date: event.date,
    title: event.title,
    image: event.image,
  };
  fetch(`${dbUrl}/events`, {
    method: 'POST',
    body: JSON.stringify(eventObj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteEvent = (eventId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events/${eventId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getAllEvents, getSingleEvent, updateEvent, createEvent, deleteEvent,
};
