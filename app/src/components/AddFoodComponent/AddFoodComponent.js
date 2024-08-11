import React, { useEffect } from "react";
import { useState } from "react";

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('restaurantId', restaurantId);
        formData.append('categoryId', categoryId);
        formData.append('calories', calories);
        formData.append('description', description);
        formData.append('ingredients', ingredients);
        if (image instanceof File) {
            formData.append('image', image);
        }
        fetch('http://localhost:5001/food', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                setName('');
                setPrice('');
                setRestaurantId('');
                setCategoryId('');
                setCalories('');
                setDescription('');
                setIngredients('');
            })
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
                                placeholder="Name:"
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
                                placeholder="Calories:"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                                className="input"
                                required
                            />
                        </div>
                        <div className="bigInputContainers mt-3">
                            <textarea
                                className="textArea"
                                placeholder="Description:"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                            <textarea
                                className="textArea"
                                placeholder="Ingredients:"
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                required
                            />
                        </div>
                        <input
                            type="number"
                            placeholder="Price:"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="inputPrice"
                            required
                        />
                        <div className="fileContainer">
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="file"
                                id="fileInput"
                                required
                            />
                            {image ? (
                                <label htmlFor="fileInput" className="fileUploaded">
                                    <i className="fas fa-check-circle"></i>
                                    <p>Image uploaded successfully</p>
                                </label>
                            ) : (
                                <label htmlFor="fileInput" className="customFileLabel">
                                    <i className="fas fa-upload"></i>
                                    <p>Click to upload new image</p>
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="cardFooter">
                        <button>Add Food</button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};
export default AddFoodComponent;