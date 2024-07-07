import './App.css';
import Hello from './hello';
import React from 'react';
import RestaurantList from './RestaurantList';
import AddRestaurant from './AddRestaurant';
import FoodList from './FoodList';

function App() {
  return (
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
    </div>
  );
}

export default App;
