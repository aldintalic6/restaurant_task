import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import './FoodDetails.css';

const FoodDetails = () => {
    const [foodName, setFoodName] = useState('');
    const [foodPrice, setFoodPrice] = useState('');
    const [foodDescription, setFoodDescription] = useState('');
    const [foodIngredients, setFoodIngredients] = useState('');
    const [foodCalories, setFoodCalories] = useState(null);
    const [foodImage, setFoodImage] = useState(null);

    return (
        <div className="food-details-container">
            <div className="food-details-image-container">
                <img src='/images/cheeseburger.jpeg' alt="burger" className="food-details-image" />
            </div>
            <div className="food-details-middle-container">
                <h3>DESCRIPTION</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h3>INGREDIENTS</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p>
                <h3>CALORIES</h3>
                <p>127kcal</p>
            </div>
            <div className="food-details-third-container">
                <h2>BURGER</h2>
                <p>$12.99</p>
            </div>
        </div>
    );
};

export default FoodDetails;