import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Container, Rating, Typography, FormControl, FormHelperText, TextField, Button, Box, Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { BlackBorderTextField } from '../components/BlackBorderTextField.js'
import { get, add, locations_database, new_reviews_database } from '../database/databaseUtils.js'


const required_string = "הינו שדה חובה"
const people_limit_amout_string = "כמות אנשים צריכה להיות בין 3 ל 8"
const validationSchema = Yup.object().shape({
  rating: Yup.number().required(`דירוג ${required_string}`),
  selectedDate: Yup.string().required(`תאריך תחילת הגנש ${required_string}`),
  username: Yup.string().required(`שם מלא ${required_string}`),
  peopleStaying: Yup.number().min(3, people_limit_amout_string).max(8, people_limit_amout_string).required(`כמות אנשים ${required_string}`),
  residentComment: Yup.string().required(`ביקורת מגורים ${required_string}`),
  foodComment: Yup.string().required(`ביקורת אוכל ${required_string}`),
  guardingComment: Yup.string().required(`ביקורת שמירות ${required_string}`),
});

const theme = createTheme({
  direction: 'ltr'
});

const DATES_FORMAT = "DD/MM/YYYY"


const AddReviewPage = () => {
  const { name } = useParams();

  const [region, setRegion] = useState([]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    get(name, locations_database).then(data => {
        console.log("[AddReviewPage: useEffect] locations:", data)
        setRegion(data[0].region)
     })
  }, []);

  const onSubmit = (data) => {
    data = {...data, "name": name};
    console.log("[AddReviewPage: myHandleSubmit] New review sent:", data);

    add(data, new_reviews_database);

    setSent(true);
  };

  const handleGoToReviews = () => {
    // TODO: correct way to redirect?
    window.location.href = `/reviews/${name}`;
    console.log('Go to reviews button clicked!');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        הוסף ביקורת
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          <Typography gutterBottom>
            {region ? region : ""}
          </Typography>
        </Box>
        <Button variant="contained" color="primary" onClick={handleGoToReviews}>
          חזור לעמוד ביקורות
        </Button>
      </Box>
      
    <Formik
      initialValues={{
        username: '',
        rating: null,
        selectedDate: null,
        peopleStaying: 4,
        residentComment: null,
        foodComment: null,
        guardingComment: null,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>

          <FormControl error>
            <Field name="rating">
              {({ field }) => (
                <Rating 
                  {...field}
                  id="rating"
                  name="rating"
                  label="ציון בללי"
                  value={field.value}
                  onChange={(event, newValue) => {
                    field.onChange({
                      target: {
                        name: 'rating',
                        value: newValue,
                      },
                    });
                  }}
                  sx={{ 
                    fontSize: "2.5rem" 
                  }}
                />
              )}
            </Field>
            <FormHelperText>
              <ErrorMessage name="rating" />
            </FormHelperText>
          </FormControl>

          <FormControl error>
            <Field name="selectedDate">
              {({ field }) => (
                <ThemeProvider theme={theme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    {...field}
                    format={DATES_FORMAT}
                    label="תאריך תחילת הגנש"
                    onChange={(value) => {
                      setFieldValue('selectedDate', value.format(DATES_FORMAT));
                    }}
                    />
                </LocalizationProvider>
            </ThemeProvider>
              )}
            </Field>
            <FormHelperText>
              <ErrorMessage name="selectedDate" />
            </FormHelperText>
          </FormControl>
          
          </Box>

          <Stack spacing={1} mb={2}>
          <Box mb={2}>
            <FormControl error fullWidth>
              <Field name="username">
                {({ field }) => (
                  <BlackBorderTextField
                    {...field}
                    label="שם מלא"
                  />
                )}
              </Field>
              <FormHelperText>
                <ErrorMessage name="username" />
              </FormHelperText>
            </FormControl>
          </Box>

          <FormControl error fullWidth>
            <Field name="peopleStaying">
              {({ field }) => (
                <BlackBorderTextField
                  {...field}
                  type="number"
                  label="כמות אנשים"
                  InputProps={{
                      inputProps: { 
                          max: 8, min: 3 
                      }
                  }}
                  helperText="בין 3 ל8 אנשים"
                />
              )}
            </Field>
            <FormHelperText>
              <ErrorMessage name="peopleStaying" />
            </FormHelperText>
          </FormControl>

          <FormControl error fullWidth>
            <Field name="residentComment">
              {({ field }) => (
                <BlackBorderTextField
                  {...field}
                  multiline
                  rows={2}
                  label="מגורים"
                  helperText="כמות מיטות, כלי מטבח, מרחק מעמדת שמירה וכו'"
                />
              )}
            </Field>
            <FormHelperText>
              <ErrorMessage name="residentComment" />
            </FormHelperText>
          </FormControl>

          <FormControl error fullWidth>
            <Field name="foodComment">
              {({ field }) => (
                <BlackBorderTextField
                  {...field}
                  multiline
                  rows={2}
                  label="אוכל"
                  helperText="סופר בישוב, משלוחים באזור וכו'"
                />
              )}
            </Field>
            <FormHelperText>
              <ErrorMessage name="foodComment" />
            </FormHelperText>
          </FormControl>

          <FormControl error fullWidth>
            <Field name="guardingComment">
              {({ field }) => (
                <BlackBorderTextField
                  {...field}
                  multiline
                  rows={2}
                  label="שמירות"
                  helperText="כמות עמדות שמירה, איכות עמדת שמירה - מזגן וחימום, אורך זמן פטרול וכו'"
                />
              )}
            </Field>
            <FormHelperText>
              <ErrorMessage name="guardingComment" />
            </FormHelperText>
          </FormControl>

          <FormControl error fullWidth>
            <Field name="generalComment">
              {({ field }) => (
                <BlackBorderTextField
                  {...field}
                  multiline
                  rows={2}
                  label="הערות כלליות"
                  helperText="ביקורת על הרבשץ, אווירה כללית בישוב וכו'"
                />
              )}
            </Field>
            <FormHelperText>
              <ErrorMessage name="generalComment" />
            </FormHelperText>
          </FormControl>
          </Stack>

          <Button
            type="submit"
            variant="contained"
          >
            שלח
          </Button>
        </Form>
      )}
      </Formik>

      <Typography variant="h5" gutterBottom mt={2}>
        {sent && "הביקורת נקלטה ותיבדק בקרוב, תודה רבה!" }
      </Typography>
    </Container>
  );
};

export default AddReviewPage;
