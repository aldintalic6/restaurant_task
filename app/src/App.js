import './App.css';
import React from 'react';
import RestaurantList from './RestaurantList';
import AddRestaurant from './AddRestaurant';
import FoodList from './FoodList';
import AddFood from './AddFood';
import RandomFood from './RandomFood';

function App() {
  return (
    <div className="app-container"> 
        <h1>Welcome to My Restaurant App</h1>
        <div className='restraurantContainer'>
          <div className="section">
            <RestaurantList />
          </div>
          <div className="addRestaurantContainer">
            <AddRestaurant />
          </div>
        </div>
        <div className='foodContainer'>
          <div className="section">
            <FoodList />
          </div>
          <div className="addFoodContainer">
            <AddFood />
          </div>
        </div>
        <div className="randomFoodContainer">
          <RandomFood />
        </div>
    </div>
  );
}

export default App;
