/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import CompactEventCard from '../../../components/events/CompactEventCard';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleUserLeg } from '../../../utils/data/legData';

export default function LegDetail() {
  const router = useRouter();
  const { legId } = router.query;
  const [userLeg, setUserLeg] = useState({});
  const [legDates, setLegDates] = useState([]);
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

  const getUserLeg = () => {
    getSingleUserLeg(legId, user.id).then((leg) => {
      setLegDates(getDates(leg.start, leg.end));
      setUserLeg(leg);
      setEvents(leg.events);
    });
  };

  useEffect(() => {
    getUserLeg();
  }, [router, user]);

  if (user) {
    return (
      <div>
        <Typography variant="h4">Leg Overview Page</Typography>
        <hr />

        <div className="detailPage">

          <div>
            <Accordion>
              { legDates.map((date) => (
                <Accordion.Item eventKey={date.id} key={date.id}>
                  <Accordion.Header>{new Date(date.value).toLocaleString('default', { month: 'long' })} {parseInt(date.value.split('-')[2], 10)}, {parseInt(date.value.split('-')[0], 10)}</Accordion.Header>
                  { events?.filter((event) => event.date === date.value).map((theEvent) => (
                    <Accordion.Body>
                      <CompactEventCard key={theEvent.id} id={theEvent.id} title={theEvent.title} image={theEvent.image} />
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
                { userLeg.expenses?.map((expense) => (
                  <div key={expense.id}>
                    <Card.Header>{expense.title} - ${expense.amount}</Card.Header>
                    <Card.Body>{expense.comment}</Card.Body>
                  </div>
                )) }
              </Card>
              <Typography>Subtotal: ${userLeg.expenseTotal}</Typography>
            </div>

            <hr />

            <div>
              <Typography>Transportation</Typography>
              <Card>
                { userLeg.transportations?.map((transportation) => (
                  <div key={transportation.id}>
                    <Card.Header>{transportation.transportation_type?.label} - ${transportation.amount}</Card.Header>
                    <Card.Body>{transportation.comment}</Card.Body>
                  </div>
                )) }
              </Card>
              <Typography>Subtotal: ${userLeg.transportationTotal}</Typography>
            </div>
          </div>

          <hr />

          <Typography>Trip Total: ${userLeg.total}</Typography>

        </div>
      </div>
    );
  }
  return (
    <div>Must be signed in to view page.</div>
  );
}
