import React from "react";
import './App.css';

import RestaurantList from '../../RestaurantList';
import AddRestaurant from '../../AddRestaurant';
import FoodList from '../../FoodList';
import AddFood from '../../AddFood';
import RandomFood from '../../components/RandomFood/RandomFood';
import FeaturedRecipes from "../../components/FeaturedFood/FeaturedFood";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Home = () => {
    return (
      <div className="app-container"> 
        <Header />
        <FeaturedRecipes />
        <Footer />
      </div>
      );
};

export default Home;