import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from './FoodDetails.module.css';

const FoodDetails = () => {

    const [foodName, setFoodName] = useState('');
    const [foodPrice, setFoodPrice] = useState('');
    const [foodDescription, setFoodDescription] = useState('');
    const [foodIngredients, setFoodIngredients] = useState('');
    const [restaurantId, setRestaurantId] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [foodCalories, setFoodCalories] = useState(null);
    const [foodImage, setFoodImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false); 

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
                setRestaurantId(data.restaurantId);
                setCategoryId(data.categoryId);
                setFoodCalories(data.calories);
                setFoodImage(data.image);
            })
            .catch(error => console.error('Error fetching food details:', error));
    }, []);

    const handleSaveClick = () => {
        const formData = new FormData();
        formData.append('name', foodName);
        formData.append('price', foodPrice);
        formData.append('description', foodDescription);
        formData.append('ingredients', foodIngredients);
        formData.append('calories', foodCalories);
        formData.append('restaurantId', restaurantId);
        formData.append('categoryId', categoryId);
        if (foodImage instanceof File) {
            formData.append('image', foodImage);
        }
        // Save the updated food details
        fetch(`http://localhost:5001/food/${id}`, {
            method: 'PUT',
            body: formData,
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

    };

    const handleFileChange = (e) => {
        setFoodImage(e.target.files[0]);
    };

    return (
        <div className={styles.foodDetailsContainer}>
            <div className={`${styles.foodDetailsImageContainer} ml-3`}>
                {isEditing ? (
                    <input type="file" onChange={handleFileChange} />
                ) : (
                    <img src={`/images/${foodImage}`} alt={foodName} className={styles.foodDetailsImage} />
                )}
            </div>
            <div className={styles.foodDetailsMiddleContainer}>
                <h3>DESCRIPTION</h3>
                {isEditing ? (
                    <textarea
                        className={styles.textarea}
                        value={foodDescription}
                        onChange={(e) => setFoodDescription(e.target.value)}
                    />
                ) : (
                    <p className={styles.text}>{foodDescription}</p>
                )}
                <h3>INGREDIENTS</h3>
                {isEditing ? (
                    <textarea
                        className={styles.textarea}
                        value={foodIngredients}
                        onChange={(e) => setFoodIngredients(e.target.value)}
                    />
                ) : (
                    <p className={styles.text}>{foodIngredients}</p>
                )}
                <h3>CALORIES</h3>
                {isEditing ? (
                    <input
                        className={styles.input}
                        type="number"
                        value={foodCalories}
                        onChange={(e) => setFoodCalories(e.target.value)}
                    />
                ) : (
                    <p className={styles.text}>{foodCalories}kcal</p>
                )}
            </div>
            <div className={styles.foodDetailsThirdContainer}>
                {isEditing ? (
                    <>
                        <input className={styles.input} type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                        <input className={styles.input} type="number" value={foodPrice} onChange={(e) => setFoodPrice(e.target.value)} />
                    </>
                ) : (
                    <>
                        <h3>{foodName}</h3>
                        <p>${foodPrice}</p>
                    </>
                )}
                <div className={styles.foodDetailsThirdContainerButtons}>
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