import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import './FoodDetails.css';

const FoodDetails = () => {

    const [foodName, setFoodName] = useState('');
    const [foodPrice, setFoodPrice] = useState('');
    const [foodDescription, setFoodDescription] = useState('');
    const [foodIngredients, setFoodIngredients] = useState('');
    const [foodCalories, setFoodCalories] = useState(null);
    const [foodImage, setFoodImage] = useState(null);

    const { id } = useParams();

    // fetching food by id
    useEffect(() => {
        fetch(`http://localhost:5001/food/${id}`) 
            .then(response => response.json())
            .then(data => {
                setFoodName(data.name);
                setFoodPrice(data.price);
                setFoodDescription(data.description);
                setFoodIngredients(data.ingredients);
                setFoodCalories(data.calories);
                setFoodImage(data.image);
            })
            .catch(error => console.error('Error fetching food details:', error));
    }, []); 

    return (
        <div className="food-details-container">
            <div className="food-details-image-container ml-3">
                <img src={`/images/${foodImage}`} alt={foodName} className="food-details-image" />
            </div>
            <div className="food-details-middle-container">
                <h3>DESCRIPTION</h3>
                <p>{foodDescription}</p>
                <h3>INGREDIENTS</h3>
                <p>{foodIngredients}</p>
                <h3>CALORIES</h3>
                <p>{foodCalories}kcal</p>
            </div>
            <div className="food-details-third-container">
                <h3>{foodName}</h3>
                <p>${foodPrice}</p>
            </div>
        </div>
    );
};

export default FoodDetails;