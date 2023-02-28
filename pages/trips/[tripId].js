/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../../utils/context/authContext';
import { getSingleTrip, getSingleUserTrip } from '../../utils/data/tripData';
import { getYelpRecommendations } from '../../utils/data/recommendationData';
import CompactRecommendationCard from '../../components/recommendations/CompactRecommendationCard';
import CompactEventCard from '../../components/recommendations/CompactEventCard';
import CompactLegCard from '../../components/legs/CompactLegCard';
import EditModal from '../../components/trips/EditModal';

export default function TripOverview() {
  const router = useRouter();
  const { tripId } = router.query;
  const { user } = useAuth();
  const [userTrip, setUserTrip] = useState({});
  const [nonUserTrip, setNonUserTrip] = useState({});
  const [recommendations, setRecommendations] = useState([]);

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

  if (userTrip.id) {
    return (
      <div>
        <div className="overviewPageHeader">
          <div className="overviewPageHeader">
            <Typography variant="h4">{userTrip.travelTo}</Typography>
            <EditModal travelDestination={userTrip.travelTo} />
          </div>
          <div>
            <Typography variant="p">Delete trip</Typography>
            <DeleteIcon />
          </div>
        </div>

        <div className="overviewPageEdit">
          <Typography variant="h6">{new Date(userTrip.start).toLocaleString('default', { month: 'long' })} {parseInt(userTrip.start.split('-')[2], 10)} - {new Date(userTrip.end).toLocaleString('default', { month: 'long' })} {parseInt(userTrip.end.split('-')[2], 10)}, {parseInt(userTrip.end.split('-')[0], 10)}</Typography>
          <EditIcon />
        </div>

        <div className="expensesAndTransportationSubheader">
          <AttachMoneyIcon />
          <Typography variant="p">View Budget</Typography>
          <FlightTakeoffIcon />
          <Typography variant="p">View Expenses & transportation</Typography>
        </div>

        <Typography variant="p">Detailed view</Typography>

        <hr />

        <Box>
          { userTrip.legs.length ? (
            <>
              <div className="homePageTripsHeader">
                <Typography variant="h4"> Trip Legs</Typography>
                <div className="homePageTripsHeader">
                  <AddCircleOutlineIcon />
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
                <Typography variant="h4"> Trip Legs</Typography>
                <div>
                  <AddCircleOutlineIcon />
                </div>
              </div>
              <Typography variant="h5"> No trip legs planned!</Typography>
            </>
          )}
        </Box>

        <hr />

        <Box>
          <div className="homePageTripsHeader">
            <Typography variant="h4"> Events</Typography>
            <div>
              <AddCircleOutlineIcon className="homePageTripsHeader" />
            </div>
          </div>
          <div className="compactTripCardsOnHomePage">
            { userTrip.events.length ? (
              userTrip.events.map((event) => (
                <CompactEventCard image={event.image} title={event.title} />
              ))
            ) : (
              <div />
            )}
            { userTrip.legs ? (
              userTrip.legs.map((leg) => (
                leg.events.map((event) => (
                  <CompactEventCard image={event.image} title={event.title} />
                ))
              ))
            ) : (
              <div />
            )}
          </div>
        </Box>

        <hr />

        <Box>
          <Typography variant="p">Recommendations</Typography>
          <div className="compactTripCardsOnHomePage">
            { recommendations.map((recommendation) => (
              <CompactRecommendationCard key={recommendation.id} image={recommendation.image_url} name={recommendation.name} rating={recommendation.rating} link={recommendation.url} />
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
