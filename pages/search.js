/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getAllTripsByUser } from '../utils/data/tripData';
import CompactTripCard from '../components/trips/CompactTripCard';

export default function SearchPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);

  const getTrips = () => {
    getAllTripsByUser(user.id).then((trips) => {
      const value = router.query.keyword;
      setFilteredData(trips);
      const results = trips.filter((trip) => trip.travel_to.toLowerCase().includes(value.toLowerCase()));
      setFilteredData(results);
    });
  };

  useEffect(() => {
    getTrips();
    setFilteredData([]);
  }, [router.query.keyword]);

  if (user) {
    return (
      <>
        <h1><u>Search Results</u></h1>
        <h2 className="searchPageSubheader">You searched for...{router.query.keyword.toLocaleUpperCase()}</h2>
        <div>
          {filteredData.length ? filteredData.map((trip) => (
            <CompactTripCard key={trip.id} id={trip.id} travelTo={trip.travel_to} start={trip.start} end={trip.end} duration={trip.duration} />
          )) : <h2>No Results Found.</h2>}
        </div>
      </>
    );
  }
  return (
    <div>Must be signed in to view page</div>
  );
}
