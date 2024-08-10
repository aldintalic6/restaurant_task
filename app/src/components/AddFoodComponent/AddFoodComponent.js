import React, { useEffect } from "react";
import { useState } from "react";

import './AddFoodComponent.css';

const AddFoodComponent = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantId, setRestaurantId] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [image, setImage] = useState(null);
    const [calories, setCalories] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');

    useEffect(() => {
        fetch('http://localhost:5001/restaurants')
            .then(response => response.json())
            .then(data => setRestaurants(data))
            .catch(error => console.error('Error fetching restaurants:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5001/category')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5001/food', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, restaurantId, categoryId, calories, description, ingredients }),
        })
            .then(response => response.json())
            .catch(error => {
                console.error('Error adding food:', error);
            });
    };

    return (
        <div className="addFoodComponentContainer">
            <form onSubmit={handleSubmit}>
                <div className="firstCard">
                    <div className="cardHeader">
                        <p>Food details</p>
                    </div>
                    <div className="cardBody">
                        <div className="multipleInputsContainer">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input"
                                required
                            />
                            <select value={restaurantId} onChange={(e) => setRestaurantId(e.target.value)} className="input" required>
                                <option value="" disabled>Select a restaurant</option>
                                {restaurants.map(
                                    restaurant => (
                                        <option key={restaurant.Id} value={restaurant.Id}>{restaurant.name}</option>
                                    )
                                )}
                            </select>
                            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="input" required>
                                <option value="" disabled>Select a category</option>
                                {categories.map(
                                    category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    )
                                )}
                            </select>
                            <input
                                type="number"
                                placeholder="Calories"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                                className="input"
                                required
                            />
                        </div>
                        <div className="bigInputContainers">
                            <textarea
                                className="textArea"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                            <textarea
                                className="textArea"
                                placeholder="Ingredients"
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                required
                            />
                        </div>
                        <input
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="inputPrice"
                                required
                            />
                    </div>
                    <div className="cardFooter">
                        <button>Add Food</button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default AddFoodComponent;