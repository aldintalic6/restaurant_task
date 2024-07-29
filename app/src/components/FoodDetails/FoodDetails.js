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
    const [isEditing, setIsEditing] = useState(false); // state to toggle edit mode

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

    const handleSaveClick = () => {
        // Save the updated food details
        fetch(`http://localhost:5001/food/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: foodName,
                price: foodPrice,
                description: foodDescription,
                ingredients: foodIngredients,
                calories: foodCalories,
                image: foodImage,
            }),
        })
            .then(response => response.json())
            .then(data => {
                setIsEditing(false);
            })
            .catch(error => console.error('Error updating food details:', error));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        // Optionally, reset the fields to the original values
    };

    return (
        <div className="food-details-container">
            <div className="food-details-image-container ml-3">
                <img src={`/images/${foodImage}`} alt={foodName} className="food-details-image" />
            </div>
            <div className="food-details-middle-container">
                <h3>DESCRIPTION</h3>
                {isEditing ? (
                    <textarea value={foodDescription} onChange={(e) => setFoodDescription(e.target.value)} />
                ) : (
                    <p>{foodDescription}</p>
                )}
                <h3>INGREDIENTS</h3>
                {isEditing ? (
                    <textarea value={foodIngredients} onChange={(e) => setFoodIngredients(e.target.value)} />
                ) : (
                    <p>{foodIngredients}</p>
                )}
                <h3>CALORIES</h3>
                {isEditing ? (
                    <input type="number" value={foodCalories} onChange={(e) => setFoodCalories(e.target.value)} />
                ) : (
                    <p>{foodCalories}kcal</p>
                )}
            </div>
            <div className="food-details-third-container">
                {isEditing ? (
                    <>
                        <input type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                        <input type="number" value={foodPrice} onChange={(e) => setFoodPrice(e.target.value)} />
                    </>
                ) : (
                    <>
                        <h3>{foodName}</h3>
                        <p>${foodPrice}</p>
                    </>
                )}
                <div className="food-details-third-container-buttons">
                    {isEditing ? (
                        <>
                            <button onClick={handleSaveClick}>Save</button>
                            <button onClick={handleCancelClick}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleEditClick}>Edit</button>
                            <button>Delete</button>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default FoodDetails;