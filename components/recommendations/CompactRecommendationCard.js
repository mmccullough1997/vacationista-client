/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Rating } from 'react-simple-star-rating';
import PropTypes from 'prop-types';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function CompactRecommendationCard({
  image, name, rating, link, count,
}) {
  const placeholder = 'https://a.cdn-hotels.com/gdcs/production198/d114/7675d489-a16b-4ae0-bed6-ec1082078aa4.jpg';

  return (
    <div>
      <Card sx={{ width: 'auto', height: 'auto' }} onClick={() => window.open(`${link}`)}>
        { image ? (
          <CardMedia
            component="img"
            alt={name}
            height="120"
            image={image}
          />
        ) : (
          <CardMedia
            component="img"
            alt={name}
            height="120"
            image={placeholder}
          />

        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <div className="compactTripCardsOnHomePage">
            <Rating initialValue={rating} allowFraction size={15} />
            <p>({count})</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

CompactRecommendationCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  link: PropTypes.string,
  count: PropTypes.number,
};
