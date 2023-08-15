import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';
import ReviewCard from '../components/ReviewCard.js';
import { get } from '../database/databaseUtils.js'
import { useParams } from "react-router-dom";
import LeafletMap from "../components/LeafletMap";




const ReviewsPage = () => {
  const { name } = useParams();
  const [reviewsData, setReviewsData] = useState(null);
  const [locationsData, setLocationsData] = useState(null);
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    get(name).then(data => {
        console.log("[ReviewsPage: useEffect] reviews:", data)
        setReviewsData(data)
     })
    get(null, "locations").then(data => {
        console.log("[ReviewsPage: useEffect] locations:", data)
        setLocationsData(data)
        // const filteredLocations = data.filter((location) =>
        //   location.name.toLowerCase().includes(searchQuery.toLowerCase())
        // );
        // console.log();
        setLocationData(data.filter((location) => 
          location.name.toLowerCase() === name.toLowerCase()
        )[0]);
      })

  }, []);

  const ratingAverage = reviewsData ? (reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length) : 0;
  
  const handleAddReview = () => {
    // TODO: correct way to redirect?
    // TODO: make this a const
    window.location.href = `/add_review/${name}`;
    console.log('Add a review button clicked!');
  };
  // 

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
      {name}
      </Typography>
      <Typography align="center" gutterBottom>
      {locationData ? locationData.region : ""}
      </Typography>
      
      {locationData ? <LeafletMap centerLocation={locationData} locationsData={locationsData} /> : ""}
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          {reviewsData ? <Typography variant="h6">דירוג ממוצע: {ratingAverage.toFixed(1)}</Typography> : "Loading"}
          <Typography variant="h6">מידע כללי: {locationData ? locationData.generalData : ""}</Typography>
        </Box>
        <Button variant="contained" color="primary" onClick={handleAddReview}>
          הוסף ביקורת
        </Button>
      </Box>
      {reviewsData && reviewsData.map((review) => <ReviewCard review={review}/> )  }

    </Container>
  );
};

export default ReviewsPage;
