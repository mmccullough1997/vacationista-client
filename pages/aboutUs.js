/* eslint-disable import/no-extraneous-dependencies */
import { Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import picture from '../public/aboutUs.jpg';

export default function AboutUs() {
  return (
    <div>
      <h1>About us:</h1>
      <Image src={picture} height="500" width="1000" />
      <Typography>
        From romantic getaways to family vacations, adventure trips to luxury escapes, we have the expertise and resources to make your travel dreams a reality. Our team is well-versed in the latest travel trends and destinations, and we are always up-to-date on the latest industry developments. Whether you&apos;re looking to book a cruise, tour a foreign country, or simply enjoy a relaxing beach vacation, we have the knowledge and experience to help you plan the perfect trip.

        At Vacationista, we are committed to providing our clients with exceptional customer service, and we are always available to answer questions, offer advice, and make sure your trip is as smooth and stress-free as possible.
      </Typography>
    </div>
  );
}
