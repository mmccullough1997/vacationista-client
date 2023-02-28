/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PropTypes from 'prop-types';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function CompactEventCard({
  image, title,
}) {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={image}
        />
        <CardContent>
          <Typography variant="h7" color="text.secondary">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

CompactEventCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
