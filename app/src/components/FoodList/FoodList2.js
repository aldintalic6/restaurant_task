import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import './FoodList2.css';

const FoodList2 = () => {
    const [category, setCategory] = useState([]);
    const [food, setFood] = useState([]); // contains max. 3 filtered food entries 
    const [allFood, setAllFood] = useState([]); // contains all the food
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5001/food')
            .then(response => response.json())
            .then(data => {
                setAllFood(data)
                setFood(data);
            })
            .catch(error => console.error('Error fetching restaurants:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5001/category')
            .then(response => response.json())
            .then(data => setCategory(data))
            .catch(error => console.error('Error fetching restaurants:', error));
    }, []);

    // display random three food when category is selected
    const selectRandomFood = (foodArray) => {
        let selectedFood = [];
        let foodArrayCopy = [...foodArray];

        for (let index = 0; index < 3; index++) {
            if (foodArrayCopy.length === 0) break;

            const randomIndex = Math.floor(Math.random() * foodArrayCopy.length);
            const element = foodArrayCopy.splice(randomIndex, 1)[0]; // splice - removes the random food from the array, so it isnt selected again
            selectedFood.push(element);
        }

        setFood(selectedFood);
    };

    // display all food again when category not selected
    const displayAllFood = (foodArray) => {
        setFood(foodArray);
    }

    // handle category click
    const handleCategoryClick = (category) => {
        if (selectedCategory && selectedCategory.id === category.id) {
            setSelectedCategory(null);
            displayAllFood(allFood)
        }
        else if (category) {
            setSelectedCategory(category);
            const filteredFood = allFood.filter(foodItem => foodItem.categoryId === category.id);
            selectRandomFood(filteredFood);
        }
    };

    return (
        <div className="foodlist-container">
            {/* category cards */}
            <div className="category-container mt-4">
                {category.map(categoryItem => (
                    <div
                        key={categoryItem.id}
                        className={`category-card ${selectedCategory && selectedCategory.id === categoryItem.id ? 'selected' : ''}`}
                        onClick={() => handleCategoryClick(categoryItem)}>
                        <div className="image-text-container">
                            <img src={`/images/${categoryItem.image}`} alt={categoryItem.name} className="category-image" />
                            <p className="category-text mt-1">{categoryItem.name}</p>
                        </div>

                    </div>
                ))}
            </div>

            {/* food cards */}
            <div className="food-container mt-4 mb-4">
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
        </div>
    );
};

export default FoodList2;