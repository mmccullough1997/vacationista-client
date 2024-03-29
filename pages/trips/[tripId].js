/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useAuth } from '../../utils/context/authContext';
import { deleteTrip, getSingleTrip, getSingleUserTrip } from '../../utils/data/tripData';
import { getYelpRecommendations } from '../../utils/data/recommendationData';
import CompactRecommendationCard from '../../components/recommendations/CompactRecommendationCard';
import CompactEventCard from '../../components/events/CompactEventCard';
import CompactLegCard from '../../components/legs/CompactLegCard';
import EditModal from '../../components/Trips&Legs/EditModal';
import NewModal from '../../components/Trips&Legs/NewModal';
import NewEventModal from '../../components/events/NewEventModal';

export default function TripOverview() {
  const router = useRouter();
  const { tripId } = router.query;
  const { user } = useAuth();
  const [userTrip, setUserTrip] = useState({});
  const [nonUserTrip, setNonUserTrip] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  // fix months on dates

  const getUserTrip = () => {
    getSingleUserTrip(tripId, user.id).then((trip) => {
      if (trip.id) {
        setUserTrip(trip);
        getYelpRecommendations(trip.travelTo).then((resp) => setRecommendations(resp.businesses));
      }
      getSingleTrip(tripId).then(setNonUserTrip);
    });
  };

  useEffect(() => {
    getUserTrip();
  }, [router, user]);

  const deleteTheTrip = () => {
    if (window.confirm('DANGER ZONE: Are you sure you want to delete this trip?')) {
      deleteTrip(userTrip.id).then(() => router.push('/'));
    }
  };

  // const newStart = new Date(userTrip.start);
  // const startMonth = newStart.getMonth();
  // const newMonth = startMonth + 1;
  // newStart.setMonth(newMonth);

  if (user) {
    if (userTrip.id) {
      return (
        <div>
          <div className="overviewPageHeader" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
            <div className="overviewPageHeader">
              <Typography variant="h4">{userTrip.travelTo}</Typography>
              <EditModal autoToLocation={userTrip.travelTo} id={userTrip.id} isTrip />
            </div>
            <div>
              <Typography variant="p">Delete trip</Typography>
              <DeleteIcon onClick={deleteTheTrip} />
            </div>
          </div>

          <div className="overviewPageEdit">
            <Typography variant="h6">{new Date(userTrip.start).toLocaleString('default', { month: 'long' })} {parseInt(userTrip.start.split('-')[2], 10)} - {new Date(userTrip.end).toLocaleString('default', { month: 'long' })} {parseInt(userTrip.end.split('-')[2], 10)}, {parseInt(userTrip.end.split('-')[0], 10)}</Typography>
            <EditModal start={userTrip.start} end={userTrip.end} id={userTrip.id} isTrip />
          </div>

          <div className="expensesAndTransportationSubheader">
            <EditModal budget={userTrip.budget} id={userTrip.id} isTrip />
            <Typography variant="p" style={{ marginRight: '20px' }}>View Budget</Typography>
            <FlightTakeoffIcon onClick={() => router.push(`/trips/expensesAndtransportations/${userTrip.id}`)} />
            <Typography variant="p">View Expenses & transportation</Typography>
          </div>

          <Typography variant="p" onClick={() => router.push(`/trips/detail/${userTrip.id}`)} style={{ display: 'flex', justifyContent: 'flex-end', color: 'blue' }}>Detailed view</Typography>

          <hr />

          <Box>
            { userTrip.legs.length ? (
              <>
                <div className="homePageTripsHeader">
                  <Typography variant="h5"> Trip Legs</Typography>
                  <div className="homePageTripsHeader">
                    <NewModal user={user} tripId={userTrip.id} />
                  </div>
                </div>
                <div className="compactTripCardsOnHomePage">
                  { userTrip.legs.map((leg) => (
                    <CompactLegCard key={leg.id} id={leg.id} location={leg.location} start={leg.start} end={leg.end} duration={leg.duration} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div>
                  <Typography variant="h5"> Trip Legs</Typography>
                  <div>
                    <NewModal user={user} tripId={userTrip.id} />
                  </div>
                </div>
                <Typography variant="h5"> No trip legs planned!</Typography>
              </>
            )}
          </Box>

          <hr />

          <Box>
            <div className="homePageTripsHeader">
              <Typography variant="h5"> Events</Typography>
              <div>
                <NewEventModal user={user} tripId={userTrip.id} tripLocation={userTrip.travelTo} />
              </div>
            </div>
            <div className="compactTripCardsOnHomePage" style={{ display: 'flex', flexWrap: 'wrap' }}>
              { userTrip.events.length ? (
                userTrip.events.map((event) => (
                  <div className="compactTripCardsOnHomePage" style={{ display: 'flex', flexWrap: 'wrap', margin: 5 }}>
                    <CompactEventCard key={event.id} image={event.image} title={event.title} id={event.id} />
                  </div>
                ))
              ) : (
                <div />
              )}
              { userTrip.legs ? (
                userTrip.legs.map((leg) => (
                  leg.events.map((event) => (
                    <div className="compactTripCardsOnHomePage" style={{ display: 'flex', flexWrap: 'wrap', margin: 5 }}>
                      <CompactEventCard key={event.id} image={event.image} title={event.title} id={event.id} />
                    </div>
                  ))
                ))
              ) : (
                <div />
              )}
            </div>
          </Box>

          <hr />

          <Box>
            <Typography variant="h5">Recommendations</Typography>
            <div className="compactTripCardsOnHomePage" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
              { recommendations?.map((recommendation) => (
                <div
                  className="recommendationCards"
                  style={{
                    margin: 5,
                  }}
                >
                  <CompactRecommendationCard key={recommendation.id} image={recommendation.image_url} name={recommendation.name} rating={recommendation.rating} link={recommendation.url} count={recommendation.review_count} />
                </div>
              ))}
            </div>
          </Box>

        </div>
      );
    }

    return (
      <div>
        <div>
          <Typography variant="h4">{nonUserTrip.travelTo}</Typography>
        </div>
      </div>
    );
  }
  return (
    <div>Must be signed in to view page.</div>
  );
}
