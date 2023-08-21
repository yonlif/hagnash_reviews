import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/index.js';
import AddReviewPage from '../pages/AddReviewPage.js';
import ReviewsPage from '../pages/ReviewsPage.tsx';


function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={ <Home /> } />
        <Route path='/add_review/:name' element={ <AddReviewPage /> } />
        <Route path='/reviews/:name' element={ <ReviewsPage /> } />
      </Routes>
    </Router>
  );
}

export default AppRouter;
