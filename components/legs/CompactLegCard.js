/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import {
  Box, Button, CardActions, CardHeader,
} from '@mui/material';

export default function CompactLegCard({
  id, location, start, end, duration,
}) {
  const router = useRouter();
  const startMonth = new Date(start).toLocaleString('default', { month: 'long' });
  const startDay = parseInt(start.split('-')[2], 10);
  const endMonth = new Date(end).toLocaleString('default', { month: 'long' });
  const endDay = parseInt(end.split('-')[2], 10);

  return (
    <Card sx={{
      height: 'auto', width: 'auto', margin: 1, padding: 2,
    }}
    >
      <CardHeader
        title={location}
      />
      <hr />
      <Box>
        <Typography variant="h6">{startMonth} {startDay} - {endMonth} {endDay} ({duration} days)</Typography>
      </Box>
      <CardActions>
        <Button size="small" onClick={() => router.push(`/legs/${id}`)}>View Leg</Button>
      </CardActions>
    </Card>
  );
}

CompactLegCard.propTypes = {
  id: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};
