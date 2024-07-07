import React from "react";
import { useState, useEffect } from "react";

function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/restaurants')
          .then(response => response.json())
          .then(data => setRestaurants(data))
          .catch(error => console.error('Error fetching restaurants:', error));
      }, []);

      return (
        <div>
          <h2>Restaurants</h2>
          <ul>
            {restaurants.map(restaurant => (
              <li key={restaurant.id}>{restaurant.name} - {restaurant.address} - {restaurant.telephone}</li>
            ))}
          </ul>
        </div>
      );
}

export default RestaurantList;