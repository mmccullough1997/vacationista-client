/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import PropTypes from 'prop-types';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

export default function CompactRecommendationCard({
  image, name, rating, link,
}) {
  const router = useRouter();

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt={name}
          height="140"
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="h7" color="text.secondary">
            {rating}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => router.push(`${link}`)} size="small">Link</Button>
        </CardActions>
      </Card>
    </div>
  );
}

CompactRecommendationCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
};