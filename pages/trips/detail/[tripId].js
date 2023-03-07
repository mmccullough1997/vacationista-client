/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import CompactEventCard from '../../../components/events/CompactEventCard';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleUserTrip } from '../../../utils/data/tripData';

export default function TripDetail() {
  const router = useRouter();
  const { tripId } = router.query;
  const [userTrip, setUserTrip] = useState({});
  const [tripDates, setTripDates] = useState([]);
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  const getDates = (startDate, endDate) => {
    const dates = [];
    const currentDate = new Date(startDate);
    const theEndDate = new Date(endDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    while (currentDate <= theEndDate) {
      dates.push(currentDate.toLocaleDateString('en-US', options));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    const newDateArray = dates.map((item, index) => ({
      id: index,
      value: item,
    }));
    return newDateArray;
  };

  // still need to add trip events as well
  const getUserTrip = () => {
    getSingleUserTrip(tripId, user.id).then((trip) => {
      setTripDates(getDates(trip.start, trip.end));
      setUserTrip(trip);
      const theEvent = [];
      trip.legs.forEach((leg) => {
        leg.events.map((event) => {
          theEvent.push(event);
          return theEvent;
        });
        setEvents(theEvent);
      });
    });
  };

  useEffect(() => {
    getUserTrip();
  }, [router, user]);

  console.warn('events', events);
  console.warn('trip', userTrip);

  return (
    <div>
      <Typography variant="h4">Trip Overview Page</Typography>
      <hr />

      <div>

        <div>
          <Accordion>
            { tripDates.map((date) => (
              <Accordion.Item eventKey={date.id}>
                <Accordion.Header>{date.value}</Accordion.Header>
                { events?.filter((event) => event.id === date.id).map((theEvent) => (
                  <Accordion.Body>
                    <CompactEventCard id={theEvent.id} title={theEvent.title} image={theEvent.image} />
                  </Accordion.Body>
                ))}
              </Accordion.Item>
            ))}
          </Accordion>
        </div>

        <div>
          Expenses & Transportations
        </div>

      </div>
    </div>
  );
}
