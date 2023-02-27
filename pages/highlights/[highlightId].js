/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardMedia, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleDestinationHighlight } from '../../utils/data/destinationHighlightData';

export default function HighlightDetailView() {
  const router = useRouter();
  const { highlightId } = router.query;
  const [destinationHighlight, setDestinationHighlight] = useState({});

  const getHighlight = () => {
    getSingleDestinationHighlight(highlightId).then(setDestinationHighlight);
  };

  useEffect(() => {
    getHighlight();
  }, [router]);

  return (
    <>
      <Card sx={{ display: 'inline' }}>
        <Typography variant="h5">{destinationHighlight?.title}</Typography>
        <Typography component="h6" variant="subtitle">Location: {destinationHighlight?.location}</Typography>
        <CardMedia
          className="destinationHighlightDetailImage"
          component="img"
          sx={{ width: 'auto', height: 200 }}
          image={destinationHighlight?.image}
          alt={destinationHighlight?.title}
        />
        <Typography color="text.secondary" component="p">
          {destinationHighlight?.content}
        </Typography>
      </Card>
    </>
  );
}
