/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { deleteEvent, getSingleEvent } from '../../utils/data/eventData';
import getAllEventTypes from '../../utils/data/eventTypeData';
import EventEditModal from '../../components/events/EventEditModal';

export default function EventOverview() {
  const router = useRouter();
  const { eventId } = router.query;
  const { user } = useAuth();
  const [event, setEvent] = useState({});
  const [eventTypes, setEventTypes] = useState([]);

  const getTheEvents = () => {
    getSingleEvent(eventId).then(setEvent);
    getAllEventTypes().then(setEventTypes);
  };

  useEffect(() => {
    getTheEvents();
  }, [router, user]);

  const deleteTheEvent = () => {
    if (window.confirm('DANGER ZONE: Are you sure you want to delete this event?')) {
      const tripId = event.trip.id;
      deleteEvent(event.id).then(() => {
        router.push(`/trips/${tripId}`);
      });
    }
  };

  if (user) {
    return (
      <div>
        <div className="overviewPageHeader" style={{ marginTop: '10px' }}>
          <div className="overviewPageHeader">
            <Typography variant="h4">{event.title}</Typography>
            <EventEditModal id={event.id} title={event.title} />
          </div>
          <div>
            <Typography variant="p">Delete event</Typography>
            <DeleteIcon onClick={deleteTheEvent} />
          </div>
        </div>

        <div className="overviewPageEdit">
          <Typography variant="h6">{new Date(event.date).toLocaleString('default', { month: 'long' })} {parseInt(event.date?.split('-')[2], 10)}, {parseInt(event.date?.split('-')[0], 10)}</Typography>
          <EventEditModal id={event.id} date={event.date} />
        </div>

        <hr />

        <Box>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              sx={{
                height: 233,
                width: 400,
                alignItems: 'center',
                borderColor: 'text.primary',
                m: 1,
                border: 1,
                borderRadius: '16px',
                marginBottom: '20px',
              }}
              alt={event.title}
              src={event.image}
            />
            <EventEditModal id={event.id} image={event.image} />
          </div>
          <div style={{ display: 'flex' }}>
            <Typography>{event.eventType?.label}</Typography>
            <EventEditModal id={event.id} eventType={event.eventType?.id} eventTypes={eventTypes} />
          </div>
        </Box>

        <hr />

        <div style={{ display: 'flex' }}>
          <Typography sx={{ lineHeight: 2 }}>
            {event.description}
          </Typography>
          <EventEditModal id={event.id} description={event.description} />
        </div>
      </div>
    );
  }
  return (
    <div>Must be signed in to view page.</div>
  );
}
