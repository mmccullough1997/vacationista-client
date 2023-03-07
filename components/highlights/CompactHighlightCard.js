/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

export default function CompactHighlightCard({
  id, title, content, thumbnail,
}) {
  const router = useRouter();
  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            Destination highlight
          </Typography>
          <hr />
          <Typography variant="h5" color="text.secondary" component="div">
            {title}
          </Typography>
        </CardContent>
        <Box sx={{
          display: 'flex', alignItems: 'center', pl: 1, pb: 1,
        }}
        >
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {content?.split('.').slice(0, 2).join('.')}
          </Typography>
        </Box>
        <Typography onClick={() => router.push(`/highlights/${id}`)} color="text.secondary" component="p">
          See more...
        </Typography>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 500, height: 'auto' }}
        image={thumbnail}
        alt={title}
      />
    </Card>
  );
}

CompactHighlightCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  thumbnail: PropTypes.string,
};
