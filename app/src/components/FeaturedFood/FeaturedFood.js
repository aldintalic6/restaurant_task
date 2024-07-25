import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import './FeaturedFood.css';

const FeaturedRecipes = () => {
    const [category, setCategory] = useState([]);
    const [food, setFood] = useState([]);
    const [resturant, setRestaurant] = useState([]);

    // category
    useEffect(() => {
        fetch('http://localhost:5001/category')
            .then(response => response.json())
            .then(data => setCategory(data))
            .catch(error => console.error("Error fetching categories ", error));
    }, []);

    // food
    useEffect(() => {
        fetch('http://localhost:5001/food')
            .then(response => response.json())
            .then(data => {
                selectRandomFood(data);
            })
            .catch(error => console.error("Error fetching food ", error));
    }, []);

    // restaurants
    useEffect(() => {
        fetch('http://localhost:5001/restaurants')
            .then(response => response.json())
            .then(data => selectRandomRestaurant(data))
            .catch(error => console.error("Error fetcing restaurants ", error))
    }, []);

    const selectRandomFood = (foodArray) => {
        let selectedFood = [];
        let foodArrayCopy = [...foodArray];

        for (let index = 0; index < 3; index++) {
            if (foodArrayCopy.length === 0) break;

            const randomIndex = Math.floor(Math.random() * foodArrayCopy.length);
            const element = foodArrayCopy.splice(randomIndex, 1)[0]; // removes the random food from the array, so it isnt selected again
            selectedFood.push(element);
        }

        setFood(selectedFood);
    };

    const selectRandomRestaurant = (restaurantArray) => {
        let selectedRestaurants = [];
        let restaurantArrayCopy = [...restaurantArray];

        for (let index = 0; index < 3; index++) {
            if (restaurantArrayCopy.length === 0) break;

            const randomIndex = Math.floor(Math.random() * restaurantArrayCopy.length);
            const element = restaurantArrayCopy.splice(randomIndex, 1)[0]; // removes the random food from the array, so it isnt selected again
            selectedRestaurants.push(element);
        }

        setRestaurant(selectedRestaurants);
    };

    return (
        <div className="featured-recipes-container">
            <div className="text-container mt-3">
                <p className="categoryText">Category</p>
                <Link className="styles-link" to="/category">View all</Link>
            </div>

            {/* category cards */}
            <div className="category-container">
                {category.map(categoryitem => (
                    <div key={categoryitem.id} className="category-card">
                        <div className="image-text-container">
                            <img src={`/images/${categoryitem.image}`} alt={categoryitem.name} className="category-image" />
                            <p className="category-text mt-1">{categoryitem.name}</p>
                        </div>

                    </div>
                ))}
            </div>
            <div className="text-container mt-4">
                <p className="categoryText">Featured Food</p>
                <Link className="styles-link" to="/food">View all</Link>
            </div>

            {/* food cards */}
            <div className="food-container mt-4">
                {food.map(fooditem => (
                    <Link to={`food/${fooditem.Id}`}>
                        <div className="food-card">
                            <i className="fas fa-heart food-card-header"></i>
                            <img src={`/images/${fooditem.image}`} alt={fooditem.name} className="food-image mb-2" />
                            <div className="food-card-footer mt-2">
                                <h3 className="food-card-text">{fooditem.name}</h3>
                                <p className="food-card-price">${fooditem.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="text-container mt-4">
                <p className="categoryText">Featured Restaurants</p>
                <Link className="styles-link" to="/food">View all</Link>
            </div>

            {/* restaurants cards */}
            <div className="restaurant-container mt-4">
                {resturant.map(restaurantItem => (
                    <Link to={`restaurant/${restaurantItem.Id}`}>
                        <div className="restaurant-card">
                            <img src={`/images/${restaurantItem.image}`} alt={restaurantItem.name} className="restaurant-image mb-2" />
                            <div className="restaurant-card-footer mt-2">
                                <h3 className="restaurant-card-text">{restaurantItem.name}</h3>
                                <p className="restaurant-card-address mt-1">{restaurantItem.address}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* picture with text and login/register button cards */}

            <div className="picture-text-container mt-5">
                <div className="picture-text-container-buttons">
                    <h3 className="picture-text-container-buttons-text">Feels Like Home,</h3>
                    <h3 className="picture-text-container-buttons-text">Tastes Like Paradise</h3>
                    <h5 className="picture-text-container-buttons-smallText mt-3 mb-3">Sign in or create an account. It's completely free!</h5>
                    <div className="buttonsContainer">
                        <Link className="picture-text-container-login-button" to="/signin">Sign In</Link>
                        <Link className="picture-text-container-register-button" to="/register">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedRecipes;