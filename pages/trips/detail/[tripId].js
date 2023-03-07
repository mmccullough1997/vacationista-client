/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
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
    while (currentDate <= theEndDate) {
      dates.push(currentDate.toISOString().slice(0, 10));
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

      <div className="expensesAndTransportationSubheader">

        <div>
          <Accordion>
            { tripDates.map((date) => (
              <Accordion.Item eventKey={date.id}>
                <Accordion.Header>{new Date(date.value).toLocaleString('default', { month: 'long' })} {parseInt(date.value.split('-')[2], 10)}, {parseInt(date.value.split('-')[0], 10)}</Accordion.Header>
                { events?.filter((event) => event.date === date.value).map((theEvent) => (
                  <Accordion.Body>
                    <CompactEventCard id={theEvent.id} title={theEvent.title} image={theEvent.image} />
                  </Accordion.Body>
                ))}
              </Accordion.Item>
            ))}
          </Accordion>
        </div>

        <div>
          <div>
            <Typography>Expenses</Typography>
            <Card>
              { userTrip.expenses?.map((expense) => (
                <>
                  <Card.Header>{expense.title} - ${expense.amount}</Card.Header>
                </>
              )) }
            </Card>
            <Typography>Subtotal: ${userTrip.expenseTotal}</Typography>
          </div>

          <hr />

          <div>
            <Typography>Transportation</Typography>
            <Card>
              { userTrip.transportations?.map((transportation) => (
                <>
                  <Card.Header>{transportation.transportation_type.label} - ${transportation.amount}</Card.Header>
                </>
              )) }
            </Card>
            <Typography>Subtotal: ${userTrip.transportationTotal}</Typography>
          </div>
        </div>

        <hr />

        <Typography>Trip Total: ${userTrip.total}</Typography>

      </div>
    </div>
  );
}
