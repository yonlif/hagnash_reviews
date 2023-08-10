import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';
import ReviewCard from '../components/ReviewCard.js';
import { get } from '../database/databaseUtils.js'
import { useParams } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import LeafletMap from "../components/LeafletMap";




const ReviewsPage = () => {
  const { name } = useParams();
  const [reviewsData, setReviewsData] = useState(null);
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    get(name).then(data => {
        console.log(data)
        setReviewsData(data)
     })
    get(name, "locations").then(data => {
        console.log(data)
        setLocationData(data[0])
     })

  }, []);

  const ratingAverage = reviewsData ? (reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length) : 0;
  
  const handleAddReview = () => {
    // TODO: correct way to redirect?
    window.location.href = `/add_review/${name}`;
    console.log('Add a review button clicked!');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
      {name}
      </Typography>
      <Typography align="center" gutterBottom>
      {locationData ? locationData.region : ""}
      </Typography>
      
        <LeafletMap />
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          {reviewsData ? <Typography variant="h6">דירוג ממוצע: {ratingAverage.toFixed(1)}</Typography> : "Loading"}
          <Typography variant="h6">מידע כללי: {locationData ? locationData.generalData : ""}</Typography>
        </Box>
        <Button variant="contained" color="primary" onClick={handleAddReview}>
          הוסף ביקורת
        </Button>
      </Box>
      {reviewsData && reviewsData.map((review) =>  <ReviewCard review={review}/> )  }

    </Container>
  );
};

export default ReviewsPage;