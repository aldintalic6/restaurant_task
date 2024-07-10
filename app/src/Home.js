import React from "react";
import './App.css';

import RestaurantList from './RestaurantList';
import AddRestaurant from './AddRestaurant';
import FoodList from './FoodList';
import AddFood from './AddFood';
import RandomFood from './RandomFood';
import Header from "./components/Header";
import Footer from "./components/Footer";

const Home = () => {
    return (
      <div className="app-container"> 
        <Header />
        <RandomFood />
        <Footer />
      </div>
      );
};

export default Home;