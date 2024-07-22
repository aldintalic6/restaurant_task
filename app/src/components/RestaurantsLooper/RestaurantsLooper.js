import React from "react";
import { useState, useEffect } from "react";
import './RestaurantsLooper.css';

const RestaurantsLooper = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/restaurants', {
            credentials: 'include'
        })
            .then(respone => respone.json())
            .then(data => setRestaurants(data))
            .catch(error => console.error("Error fetching restaurans ", error));
    }, []);

    const deleteRestaurant = (id) => {
        fetch(`http://localhost:5001/restaurants/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(respone => respone.json())
            .then(data => {
                setRestaurants(restaurants.filter(restaurant => restaurant.Id !== id));
            })
            .catch(error => console.error("Error deleting restaurant", error));
    };

    return (
        <div className="restaurantsContainer">
            {restaurants.map(restaurant => (
                <div className="card mb-4 p-2">
                    <div className="card-body">
                        <h5 className="card-title">{restaurant.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{restaurant.telephone}</h6>
                        <p className="card-text">{restaurant.address}</p>
                        <div className="restaurantFooter">
                            <a href="#" className="card-link">View Restaurant</a>
                            <div className="buttonContainer">
                                <a href="#" class="btn btn-info">Edit</a>
                                <button className="btn btn-danger ml-3" onClick={() => deleteRestaurant(restaurant.Id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RestaurantsLooper;