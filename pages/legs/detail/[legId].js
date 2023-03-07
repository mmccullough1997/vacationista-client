/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleUserLeg } from '../../../utils/data/legData';

export default function LegDetail() {
  const router = useRouter();
  const { legId } = router.query;
  const [userLeg, setUserLeg] = useState({});
  const { user } = useAuth();

  const getUserLeg = () => {
    getSingleUserLeg(legId, user.id).then(setUserLeg);
  };

  useEffect(() => {
    getUserLeg();
  }, [router, user]);

  console.warn(userLeg);

  return (
    <div>
      <Typography variant="h4">Leg Overview Page</Typography>
      <hr />
    </div>
  );
}
