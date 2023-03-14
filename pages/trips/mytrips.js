/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CompactTripCard from '../../components/trips/CompactTripCard';
import { useAuth } from '../../utils/context/authContext';
import { getPastTripsByUser, getUpcomingTripsByUser } from '../../utils/data/tripData';

export default function MyTrips() {
  const { user } = useAuth();
  const [upcomingUserTrips, setUpcomingUserTrips] = useState([]);
  const [pastUserTrips, setPastUserTrips] = useState([]);
  const router = useRouter();

  const getTrips = () => {
    getUpcomingTripsByUser(user.id).then(setUpcomingUserTrips);
    getPastTripsByUser(user.id).then(setPastUserTrips);
  };
  useEffect(() => {
    getTrips();
  }, [user, router]);

  if (user) {
    return (
      <>
        { upcomingUserTrips.length ? (
          <>
            <div className="homePageTripsHeader">
              <Typography variant="h4"> Upcoming Trips</Typography>
            </div>
            <div className="compactTripCardsOnHomePage">
              { upcomingUserTrips.map((trip) => (
                <CompactTripCard key={trip.id} id={trip.id} travelTo={trip.travel_to} start={trip.start} end={trip.end} duration={trip.duration} />
              ))}
            </div>
          </>
        ) : (
          <>
            <Typography variant="h5"> No upcoming trips planned!</Typography>
          </>
        )}
        <hr />
        { pastUserTrips.length ? (
          <>
            <div className="homePageTripsHeader">
              <Typography variant="h4"> Previous Trips</Typography>
            </div>
            <div className="compactTripCardsOnHomePage">
              { pastUserTrips.map((trip) => (
                <CompactTripCard key={trip.id} id={trip.id} travelTo={trip.travel_to} start={trip.start} end={trip.end} duration={trip.duration} />
              ))}
            </div>
          </>
        ) : (
          <>
            <Typography variant="h5"> No previous trips!</Typography>
          </>
        )}
      </>
    );
  }
  return (
    <div>Must be signed in to view page.</div>
  );
}
