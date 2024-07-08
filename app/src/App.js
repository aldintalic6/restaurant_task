import './App.css';
import React from 'react';
import Home from './Home';
import RestaurantsPage from './RestaurantsPage';

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
