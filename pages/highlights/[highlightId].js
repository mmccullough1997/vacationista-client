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
    <div>
      <Card sx={{ display: 'inline' }}>
        <div style={{ marginTop: '10px' }}>
          <Typography variant="h4">{destinationHighlight?.title}</Typography>
          <Typography component="h6" variant="subtitle">Location: {destinationHighlight?.location}</Typography>

        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CardMedia
            className="destinationHighlightDetailImage"
            component="img"
            sx={{
              width: 800,
              height: 400,
              alignItems: 'center',
              borderColor: 'text.primary',
              m: 1,
              border: 1,
              borderRadius: '16px',
              marginBottom: '20px',
            }}
            image={destinationHighlight?.image}
            alt={destinationHighlight?.title}
          />
        </div>
        <Typography className="highlighttext" color="text.secondary" component="p" sx={{ lineHeight: 2 }}>
          {destinationHighlight?.content}
        </Typography>
      </Card>
    </div>
  );
}
