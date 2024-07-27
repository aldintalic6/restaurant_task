import React from 'react';

import Home from './layouts/HomeScreen/Home';
import RestaurantsPage from './layouts/RestaurantsPage/RestaurantsPage';
import Register from './layouts/RegisterScreen/Register';
import SignIn from './layouts/SignInPage/SignIn';
import SingleFood from './layouts/SingleFoodScreen/SingleFood';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/food/:id" element={<SingleFood />} />
      </Routes>
    </Router>
  );
}

export default App;
