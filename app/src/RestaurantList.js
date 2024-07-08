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
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Telephone</th>
              </tr>
            </thead>
            <tbody> 
                {restaurants.map(restaurant => (
                  <tr>
                    <th>{restaurant.name}</th>
                    <th>{restaurant.address}</th>
                    <th>{restaurant.telephone}</th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
}

export default RestaurantList;