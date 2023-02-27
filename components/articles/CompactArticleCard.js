/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';

export default function CompactArticleCard({
  id, title, thumbnail,
}) {
  const router = useRouter();

  return (
    <Card sx={{ width: 400, margin: 1 }} onClick={() => router.push(`/articles/${id}`)}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          sx={{ width: 400, height: 'auto' }}
          image={thumbnail}
          alt={title}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.54)',
            color: 'white',
            padding: '10px',
          }}
        >
          <Typography variant="h5">{title}</Typography>
        </Box>

      </Box>
    </Card>
  );
}

CompactArticleCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};
