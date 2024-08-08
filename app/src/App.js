import React from 'react';

import Home from './layouts/HomeScreen/Home';
import RestaurantsPage from './layouts/RestaurantsPage/RestaurantsPage';
import Register from './layouts/RegisterScreen/Register';
import SignIn from './layouts/SignInPage/SignIn';
import FoodScreen from './layouts/FoodScreen/FoodScreen';
import SingleFood from './layouts/SingleFoodScreen/SingleFood';
import ProfileScreen from './layouts/ProfileScreen/ProfileScreen';

import ProtectedRoute from './components/ProtectedRoute';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/food" element={<FoodScreen />} />
        <Route path="/food/:id" element={<SingleFood />} />
        <Route path="/profile" element={<ProtectedRoute element={<ProfileScreen />} />} />
      </Routes>
    </Router>
  );
}

export default App;
