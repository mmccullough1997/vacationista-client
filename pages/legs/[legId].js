/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useAuth } from '../../utils/context/authContext';
import { getYelpRecommendations } from '../../utils/data/recommendationData';
import CompactRecommendationCard from '../../components/recommendations/CompactRecommendationCard';
import CompactEventCard from '../../components/events/CompactEventCard';
import EditModal from '../../components/Trips&Legs/EditModal';
import { deleteLeg, getSingleLeg, getSingleUserLeg } from '../../utils/data/legData';
import NewEventModal from '../../components/events/NewEventModal';

export default function LegOverview() {
  const router = useRouter();
  const { legId } = router.query;
  const { user } = useAuth();
  const [userLeg, setUserLeg] = useState({});
  const [nonUserLeg, setNonUserLeg] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  const getUserLeg = () => {
    getSingleUserLeg(legId, user.id).then((leg) => {
      if (leg.id) {
        setUserLeg(leg);
        getYelpRecommendations(leg.location).then((resp) => setRecommendations(resp.businesses));
      }
      getSingleLeg(legId).then(setNonUserLeg);
    });
  };

  useEffect(() => {
    getUserLeg();
  }, [router, user]);

  const deleteTheLeg = () => {
    if (window.confirm('DANGER ZONE: Are you sure you want to delete this leg?')) {
      const tripId = userLeg.trip.id;
      deleteLeg(userLeg.id).then(() => router.push(`/trips/${tripId}`));
    }
  };

  console.warn(userLeg);

  if (userLeg.id) {
    return (
      <div>
        <div className="overviewPageHeader">
          <div className="overviewPageHeader">
            <Typography variant="h4">{userLeg.location}</Typography>
            <EditModal travelDestination={userLeg.location} id={userLeg.id} />
          </div>
          <div>
            <Typography variant="p">Delete leg</Typography>
            <DeleteIcon onClick={deleteTheLeg} />
          </div>
        </div>

        <div className="overviewPageEdit">
          <Typography variant="h6">{new Date(userLeg.start).toLocaleString('default', { month: 'long' })} {parseInt(userLeg.start.split('-')[2], 10)} - {new Date(userLeg.end).toLocaleString('default', { month: 'long' })} {parseInt(userLeg.end.split('-')[2], 10)}, {parseInt(userLeg.end.split('-')[0], 10)}</Typography>
          <EditModal start={userLeg.start} end={userLeg.end} id={userLeg.id} />
        </div>

        <div className="expensesAndTransportationSubheader">
          <EditModal budget={userLeg.budget} id={userLeg.id} />
          <Typography variant="p">View Budget</Typography>
          <FlightTakeoffIcon onClick={() => router.push(`/legs/expensesAndtransportations/${userLeg.id}`)} />
          <Typography variant="p">View Expenses & transportation</Typography>
        </div>

        <Typography variant="p" onClick={() => router.push(`/legs/detail/${userLeg.id}`)}>Detailed view</Typography>

        <hr />

        <Box>
          <div className="homePageTripsHeader">
            <Typography variant="h4"> Events</Typography>
            <div>
              <NewEventModal user={user} tripId={userLeg.trip.id} tripLocation={userLeg.trip.travel_to} />
            </div>
          </div>
          <div className="compactTripCardsOnHomePage">
            { userLeg.events.length ? (
              userLeg.events.map((event) => (
                <CompactEventCard image={event.image} title={event.title} id={event.id} />
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
            { recommendations?.map((recommendation) => (
              <CompactRecommendationCard key={recommendation.id} image={recommendation.image_url} name={recommendation.name} rating={recommendation.rating} link={recommendation.url} count={recommendation.review_count} />
            ))}
          </div>
        </Box>

      </div>
    );
  }

  return (
    <div>
      <div>
        <Typography variant="h4">{nonUserLeg.location}</Typography>
      </div>
    </div>
  );
}
