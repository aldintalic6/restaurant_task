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
      <div className="App">
        <h1>Welcome to My Restaurant App</h1>
        <div className="section">
          <RestaurantList />
        </div>
        <div className="section">
          <AddRestaurant />
        </div>
        <div className="section">
          <FoodList />
        </div>
        <div className="section">
          <AddFood />
        </div>
        <div className="section">
          <RandomFood />
        </div>
      </div>
    </div>
  );
}

export default App;
