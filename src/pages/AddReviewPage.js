import React, { useState, useEffect } from 'react';
import { Container, Rating, Typography, FormControl, Select, MenuItem, TextField, Button, Box } from '@mui/material';
import { useParams } from "react-router-dom";
import { get, add } from '../database/databaseUtils.js'

const AddReviewPage = () => {
  const { name } = useParams()
  const [region, setRegion] = useState([]);

  useEffect(() => {
    get(name, "locations").then(data => {
        console.log(data)
        setRegion(data[0].region)
     })
  }, []);


  const [inputs, setInputs] = useState({"name": name});

  const [sent, setSent] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  };

  const handleSubmit = (event) => {
    console.log(inputs);
    event.preventDefault();
    // TODO: Make sure all the values are inputed
    // TODO: Make this a const, make everything consts lol
    add(inputs, "new_reviews");

    setSent(true);
    setInputs({});
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
      

      <form onSubmit={handleSubmit}>
        <Rating 
          name="rating"
          value={inputs.rating || 0} 
          label="ציון בללי"
          sx={{ 
            paddingBottom: 2, 
            fontSize: "2.5rem" 
          }} 
          onChange={handleChange}
        />
        <TextField
          required
          name="username"
          fullWidth
          label="שם מלא"
          value={inputs.username || ""}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField 
          required
          name="peopleStaying"
          fullWidth
          type="number"
          InputProps={{
              inputProps: { 
                  max: 8, min: 3 
              }
          }}
          value={inputs.peopleStaying}
          onChange={handleChange}
          label="כמות אנשים"
          sx={{ marginBottom: 2 }}
          helperText="בין 3 ל8 אנשים"
        />
        <TextField
          required
          name="residentComment"
          fullWidth
          multiline
          rows={2}
          label="מגורים"
          value={inputs.residentComment || ""}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
          helperText="כמות מיטות, כלי מטבח, מרחק מעמדת שמירה וכו'"

        />
        <TextField
          required
          name="foodComment"
          fullWidth
          multiline
          rows={2}
          label="אוכל"
          value={inputs.foodComment || ""}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
          helperText="סופר בישוב, משלוחים באזור וכו'"

        />
        <TextField
          required
          name="guardingComment"
          fullWidth
          multiline
          rows={2}
          label="שמירות"
          value={inputs.guardingComment || ""}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
          helperText="כמות עמדות שמירה, איכות עמדת שמירה, ביקורת על הרבשץ, אורך זמן פטרול וכו'"

        />
        <TextField
          name="generalComment"
          fullWidth
          multiline
          rows={4}
          label="הערות כלליות"
          value={inputs.generalComment || ""}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        
        <Button type="submit" variant="contained" color="primary">
          שלח
        </Button>
      </form>
      <Typography variant="h5" gutterBottom>
        {sent && "הביקורת נקלטה ותיבדק בקרוב, תודה רבה!" }
      </Typography>
    </Container>
  );
};

export default AddReviewPage;


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
