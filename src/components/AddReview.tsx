import React, { useState } from 'react';
import { Container, Typography, FormControl, Select, MenuItem, TextField, Button } from '@mui/material';

const AddReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    // You can send the rating and comment to a server or store them locally
    // and show a success message or redirect the user to another page
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add a Review
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <Select value={rating} onChange={handleRatingChange} displayEmpty>
            <MenuItem value={0} disabled>
              Select Rating
            </MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Comment"
          value={comment}
          onChange={handleCommentChange}
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default AddReview;



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
