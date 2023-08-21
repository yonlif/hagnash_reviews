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

      <Typography variant="h5" gutterBottom>
        {sent && "הביקורת נקלטה ותיבדק בקרוב, תודה רבה!" }
      </Typography>
    </Container>
  );
};

export default AddReviewPage;

//             style={{backgroundColor: "#426e9a"}}



      // <form onSubmit={formik.handleSubmit}>
      //   <Rating 
      //     id="rating"
      //     name="rating"
      //     value={formik.values.rating}
      //     onChange={formik.handleChange}
      //     onBlur={formik.handleBlur}
      //     error={formik.touched.rating && Boolean(formik.errors.rating)}
      //     helperText={formik.touched.rating && formik.errors.rating}
      //     label="ציון בללי"
      //     sx={{ 
      //       paddingBottom: 2, 
      //       fontSize: "2.5rem" 
      //     }} 
      //     slotProps={{
      //       textField: {
      //           variant: "outlined",
      //           error: Boolean(formik.errors.rating),
      //           helperText: formik.errors.rating
      //       }
      //     }}
      //   />

      //   <TextField
      //     fullWidth
      //     id="username"
      //     name="username"
      //     label="שם מלא"
      //     value={formik.values.username}
      //     onChange={formik.handleChange}
      //     onBlur={formik.handleBlur}
      //     error={Boolean(formik.errors.username)}
      //     helperText={formik.errors.username}
      //     sx={{ marginBottom: 2 }}
      //   />
        

      //   <ThemeProvider theme={theme}>

      //     <LocalizationProvider dateAdapter={AdapterDayjs}>
      //       <DatePicker
      //         id="date"
      //         name="date"
      //         label="תאריך תחילת הגנש"
      //         value={formik.values.date}
      //         format={DATES_FORMAT}
      //         onChange={(value) => formik.setFieldValue("date", value, true)}
      //         onBlur={formik.handleBlur}
      //         sx={{ marginBottom: 2 }}
      //         slotProps={{
      //           textField: {
      //               variant: "outlined",
      //               error: Boolean(formik.errors.date),
      //               helperText: formik.errors.date
      //           }
      //         }}
      //       />
      //     </LocalizationProvider>
      //   </ThemeProvider>

      //   <TextField 
      //     id="peopleStaying"
      //     name="peopleStaying"
      //     fullWidth
      //     type="number"
      //     InputProps={{
      //         inputProps: { 
      //             max: 8, min: 3 
      //         }
      //     }}
      //     value={formik.peopleStaying}
      //     onChange={formik.handleChange}
      //     onBlur={formik.handleBlur}
      //     error={Boolean(formik.errors.peopleStaying)}
      //     helperText={formik.errors.peopleStaying}
      //     label="כמות אנשים"
      //     sx={{ marginBottom: 2 }}
      //   />

      //   <br/>
      //   <Button type="submit" variant="contained" color="primary">
      //     שלח
      //   </Button>
      //   {
      //     formik.errors && (
      //       <span style={{ color: "red" }}>
      //       {
      //         Object.entries(formik.errors).map( ([key, value]) => 
      //           <div> key: {key}, value: {value} </div> )
      //       }
      //       </span>
      //     )}      
      //   </form>
        


        // <Rating 
        //   name="rating"
        //   {...register("rating")}
        //   label="ציון בללי"
        //   sx={{ 
        //     paddingBottom: 2, 
        //     fontSize: "2.5rem" 
        //   }} 
        // />
// <TextField
//           required
//           {...register("username")}
//           fullWidth
//           label="שם מלא"
//           sx={{ marginBottom: 2 }}
//         />
// {errors.rating && (
//             <span style={{ color: "red" }}>{errors.rating.message}</span>
//           )}

        // <ThemeProvider theme={theme}>

        //   <LocalizationProvider dateAdapter={AdapterDayjs}>
        //     <DatePicker
        //       required
        //       name="date"
        //       label="תאריך תחילת הגנש"
        //       value={date}
        //       format={DATES_FORMAT}
        //       onChange={(value) => {
        //         console.log(value)
        //         console.log(typeof(value))
        //         setDate(value);     
        //         setInputs(values => ({...values, ["date"]: value.format(DATES_FORMAT)}))
        //       }}
        //       sx={{ marginBottom: 2 }}
        //     />
        //   </LocalizationProvider>
        // </ThemeProvider>

        // <TextField 
        //   required
        //   name="peopleStaying"
        //   fullWidth
        //   type="number"
        //   InputProps={{
        //       inputProps: { 
        //           max: 8, min: 3 
        //       }
        //   }}
        //   value={inputs.peopleStaying}
        //   onChange={handleChange}
        //   label="כמות אנשים"
        //   sx={{ marginBottom: 2 }}
        //   helperText="בין 3 ל8 אנשים"
        // />
        // <TextField
        //   required
        //   name="residentComment"
        //   fullWidth
        //   multiline
        //   rows={2}
        //   label="מגורים"
        //   value={inputs.residentComment}
        //   onChange={handleChange}
        //   sx={{ marginBottom: 2 }}
        //   helperText="כמות מיטות, כלי מטבח, מרחק מעמדת שמירה וכו'"

        // />
        // <TextField
        //   required
        //   name="foodComment"
        //   fullWidth
        //   multiline
        //   rows={2}
        //   label="אוכל"
        //   value={inputs.foodComment}
        //   onChange={handleChange}
        //   sx={{ marginBottom: 2 }}
        //   helperText="סופר בישוב, משלוחים באזור וכו'"

        // />
        // <TextField
        //   required
        //   name="guardingComment"
        //   fullWidth
        //   multiline
        //   rows={2}
        //   label="שמירות"
        //   value={inputs.guardingComment}
        //   onChange={handleChange}
        //   sx={{ marginBottom: 2 }}
        //   helperText="כמות עמדות שמירה, איכות עמדת שמירה - מזגן וחימום, אורך זמן פטרול וכו'"
        // />
        // <TextField
        //   name="generalComment"
        //   fullWidth
        //   multiline
        //   rows={4}
        //   label="הערות כלליות"
        //   value={inputs.generalComment}
        //   onChange={handleChange}
        //   sx={{ marginBottom: 2 }}
        //   helperText="ביקורת על הרבשץ, אווירה כללית בישוב וכו'"
        // />



// 
        // <TextField
        //   required
        //   name="username"
        //   fullWidth
        //   label="שם מלא"
        //   value={inputs.username || ""}
        //   onChange={handleChange}
        //   InputLabelProps={{
        //       style: { color: 'white' },
        //     }}
        //   sx={{ input: {
        //         color: "white"
        //       },marginBottom: 2 }}
        // />

// import React, { useState } from "react";
// import {
//   Button,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
//   FormLabel,
//   Rating,
//   TextField,
//   Typography,
// } from "@mui/material";

// const reviewName = 'review';

// export default function AddReview({addReview}) {
//   const [specs, setSpecs] = useState("");
//   const [checkbox, setCheckbox] = useState("false");
//   const [rating, setRating] = useState("1");
//   const handleSpecsChange = (newValue) => {
//             setSpecs(newValue.target.value);
//           };

//   const handleCheckboxChange = (
//     checked?: boolean
//   ) => {
//     setCheckbox(checked);
//   };

//   const handleRatingChange = (
//     value,
//   ) => {
//     setRating(value.target.value);
//   };

//   const handleSubmit = () => {
//     addReview();
//     // fetch('/somewhere.html', {
//     //   method: 'POST',
//     //   body: JSON.stringify(formValues),
//     //   headers: {
//     //     'Content-Type': 'application/json'
//     //   },
//     // })
//     console.log(specs);
//     console.log(checkbox);
//     console.log(rating);
//     setSpecs("");
//     setCheckbox(false);
//     setRating(null);
//   }

//   return (
//     <form>
//       <FormGroup
//         sx={{
//           padding: 2,
//           borderRadius: 2,
//           border: "1px solid",
//           borderColor: "primary.main",
//         }}
//       >
//         <TextField
//           sx={{ paddingBottom: 2 }}
//           name="specs"
//           variant="outlined"
//           value={specs}
//           onChange={handleSpecsChange}
//         />
//         <FormLabel component="legend">Product</FormLabel>
//         <FormGroup row sx={{ paddingBottom: 2 }} >
//           <FormControlLabel
//             control={<Checkbox name="laptop" value={checkbox} onChange={handleCheckboxChange}/>}
//             label="Laptop"
//           />
//         </FormGroup>
//         <Typography component="legend">Review</Typography>
//         <Rating name={reviewName} value={rating} sx={{ paddingBottom: 2 }} onChange={handleRatingChange}/>
//         <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
//       </FormGroup>
//     </form>
//   );
// }

// // import { useState } from "react";

// // const AddReview = ({ addReview }) => {
// //   const [text, setText] = useState("");
// //   const [day, setDay] = useState("");

// //   const onSubmit = (e) => {
// //     e.preventDefault();
// //     if (!text) {
// //       alert("Please add a review");
// //       return;
// //     }
// //     addReview({ text, day });
// //     // Clear the form
// //     setText("");
// //     setDay("");
// //   };

// //   return (
// //     <form className="add-form" onSubmit={onSubmit}>
// //       <div className="form-control">
// //         <label>Review</label>
// //         <input
// //           type="text"
// //           placeholder="Add Review"
// //           value={text}
// //           onChange={(e) => setText(e.target.value)}
// //         />
// //       </div>
// //       <div className="form-control">
// //         <label>Day & Time</label>
// //         <input
// //           type="text"
// //           placeholder="Add Day & Time"
// //           value={day}
// //           onChange={(e) => setDay(e.target.value)}
// //         />
// //       </div>

// //       <input type="submit" value="Save Review" className="btn btn-block" />
// //     </form>
// //   );
// // };
// // export default AddReview;

// <FormControl fullWidth sx={{ marginBottom: 2 }}>

//           <Select value={rating} onChange={handleRatingChange} displayEmpty>
//             <MenuItem value={0} disabled>
//               Select Rating
//             </MenuItem>
//             <MenuItem value={1}>1</MenuItem>
//             <MenuItem value={2}>2</MenuItem>
//             <MenuItem value={3}>3</MenuItem>
//             <MenuItem value={4}>4</MenuItem>
//             <MenuItem value={5}>5</MenuItem>
//           </Select>
//         </FormControl>
