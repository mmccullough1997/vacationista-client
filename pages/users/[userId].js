/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import UserEditModal from '../../components/users/UserEditModal';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../utils/data/userData';

export default function ProfilePage() {
  const router = useRouter();
  const { userId } = router.query;
  const [currentUser, setCurrentUser] = useState({});
  const { user } = useAuth();

  const getTheSingleUser = () => {
    getSingleUser(userId).then(setCurrentUser);
  };

  useEffect(() => {
    getTheSingleUser();
  }, [router]);

  if (user) {
    return (
      <div>

        <div className="homePageTripsHeader">

          <div className="homePageTripsHeader">
            <Typography variant="h3">{currentUser.username}</Typography>
            <UserEditModal id={currentUser.id} username={currentUser.username} />
          </div>

          <Typography variant="h7">Joined: {currentUser.dateRegistered}</Typography>

        </div>

        <div className="compactTripCardsOnHomePage">
          <Box
            component="img"
            sx={{
              height: 233,
              width: 400,
            }}
            alt={currentUser.lastName}
            src={currentUser.image}
          />
          <UserEditModal id={currentUser.id} image={currentUser.image} />
        </div>

        <div>
          <div className="compactTripCardsOnHomePage">
            <Typography variant="h6">About me: </Typography>
            <UserEditModal id={currentUser.id} bio={currentUser.bio} />
          </div>
          <Typography variant="h7">{currentUser.bio}</Typography>
        </div>

      </div>
    );
  }
  return (
    <div>Must be signed in to view page.</div>
  );
}
