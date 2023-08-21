import React, { useState, useEffect, useCallback } from 'react';
import { Container, Rating, Typography, Box, Card, CardContent, Button, Divider, Stack, Grid } from '@mui/material';
import ReviewCard from '../components/ReviewCard.js';
import { get, locations_database } from '../database/databaseUtils.js'
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
    get(null, locations_database).then(data => {
        console.log("[ReviewsPage: useEffect] locations:", data)
        setLocationsData(data)
        setLocationData(data.filter((location) => 
          location.name.toLowerCase() === name.toLowerCase()
        )[0]);
      })

  }, []);

  const ratingAverage = reviewsData ? (reviewsData.reduce((sum, review) => sum + parseInt(review.rating), 0) / reviewsData.length) : 0;
  
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
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={2}>
        <Grid container spacing={0.5} >
          <Grid item xs={3} align="right">
            <Typography noWrap variant="h6">דירוג ממוצע: </Typography>  
          </Grid>
          <Grid item xs={8} align="right" >
            {reviewsData ? <Rating precision={0.1} readOnly value={ratingAverage} /> : "Loading"}
          </Grid>

          <Grid item xs={3} align="right">
            <Typography noWrap variant="h6">מידע כללי:  </Typography>
          </Grid>
          <Grid item xs={8} align="right"  >
            <Typography variant="h6">{locationData ? locationData.generalData : ""}</Typography>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleAddReview}>
          הוסף ביקורת
        </Button>
      </Box>
      <Box mb={2}>
        <Divider />
      </Box>
      {reviewsData && reviewsData.map((review) => <ReviewCard key={review.id} review={review}/> )  }

    </Container>
  );
};

export default ReviewsPage;
