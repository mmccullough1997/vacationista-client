/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import CompactArticleCard from '../components/articles/CompactArticleCard';
import CompactHighlightCard from '../components/highlights/CompactHighlightCard';
import { useAuth } from '../utils/context/authContext';
import { getAllArticles } from '../utils/data/articleData';
import { getHighlightIdArray, getSingleDestinationHighlight } from '../utils/data/destinationHighlightData';
import { getUpcomingTripsByUser } from '../utils/data/tripData';
import CompactTripCard from '../components/trips/CompactTripCard';
import NewModal from '../components/Trips&Legs/NewModal';

function Home() {
  const { user } = useAuth();
  const [destinationHighlight, setDestinationHighlight] = useState({});
  const [articles, setArticles] = useState([]);
  const [upcomingUserTrips, setUpcomingUserTrips] = useState([]);
  const router = useRouter();

  const getRandomDestinationHighlight = () => {
    getHighlightIdArray().then((idArray) => {
      getSingleDestinationHighlight(idArray[Math.floor(Math.random() * idArray.length)]).then(setDestinationHighlight);
    });
  };

  const getArticles = () => {
    getAllArticles().then(setArticles);
  };

  const getUpcomingUserTrips = () => {
    getUpcomingTripsByUser(user.id).then(setUpcomingUserTrips);
  };

  // User is signed in
  if (user) {
    useEffect(() => {
      getRandomDestinationHighlight();
      getArticles();
      getUpcomingUserTrips();
    }, [user, router]);

    return (
      <div className="index">
        <CompactHighlightCard id={destinationHighlight?.id} title={destinationHighlight?.title} content={destinationHighlight?.content} thumbnail={destinationHighlight?.thumbnail} />
        <hr />
        { upcomingUserTrips.length ? (
          <>
            <div className="homePageTripsHeader">
              <Typography variant="h4"> Upcoming Trips</Typography>
              <NewModal user={user} isTrip />
            </div>
            <div className="compactTripCardsOnHomePage">
              { upcomingUserTrips.map((trip) => (
                <CompactTripCard key={trip.id} id={trip.id} travelTo={trip.travel_to} start={trip.start} end={trip.end} duration={trip.duration} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="homePageTripsHeader">
              <Typography variant="h4"> Upcoming Trips</Typography>
              <NewModal user={user} isTrip />
            </div>
            <Typography variant="h5"> No upcoming trips planned!</Typography>
          </>
        )}
        <hr />
        <div className="homePageArticles">
          {articles.map((theArticle) => (
            <CompactArticleCard key={theArticle.id} id={theArticle.id} title={theArticle.title} thumbnail={theArticle.thumbnail} />
          ))}
        </div>
      </div>
    );
  }

  // User is not signed in
  useEffect(() => {
    getRandomDestinationHighlight();
    getArticles();
  }, [user, router]);

  return (
    <div className="index">
      <CompactHighlightCard id={destinationHighlight?.id} title={destinationHighlight?.title} content={destinationHighlight?.content} thumbnail={destinationHighlight?.thumbnail} />
      <hr />
      <div className="homePageArticles">
        {articles.map((theArticle) => (
          <CompactArticleCard id={theArticle.id} title={theArticle.title} thumbnail={theArticle.thumbnail} />
        ))}
      </div>
    </div>
  );
}

export default Home;
