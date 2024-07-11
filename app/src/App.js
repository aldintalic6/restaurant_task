import React from 'react';
import Home from './layouts/HomeScreen/Home';
import RestaurantsPage from './layouts/RestaurantsPage/RestaurantsPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
