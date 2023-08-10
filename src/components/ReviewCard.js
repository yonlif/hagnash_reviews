import React, { useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';

const ReviewCard = ({ review }) => {
  const [expandedCard, setExpandedCard] = useState(false);

  const handleCardExpand = () => {
    setExpandedCard(!expandedCard);
    console.log(expandedCard);
  };

  return (
    <Card key={review.id} variant="outlined" sx={{ marginBottom: 2 }} onClick={() => handleCardExpand()}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              דירוג: {review.rating}
            </Typography>
            <Typography variant="body1">
              מדרג: {review.username}
            </Typography>
          {expandedCard && (
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary">
                  כמות אנשים: {review.peopleStaying}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  שמירות: {review.guardingComment}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  מגורים: {review.residentComment}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  אוכל: {review.foodComment}
                </Typography>

              </Box>
            )}
          </CardContent>
        </Card>
  );
};

export default ReviewCard;
