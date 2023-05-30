import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages';
import AddReview from '../pages/AddReview';
import Reviews from '../pages/reviews';
import Navbar from './Navbar';



function AppRouter() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path='/' exact element={ <Home /> } />
        <Route path='/add_review' element={ <AddReview /> } />
        <Route path='/reviews' element={ <Reviews /> } />
      </Routes>
    </Router>
  );
}
  
export default AppRouter;
