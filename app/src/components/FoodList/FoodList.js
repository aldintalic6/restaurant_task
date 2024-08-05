import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import styles from './FoodList.module.css';

const FoodList = () => {
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
        <div className={styles.foodlistContainer}>
            {/* category cards */}
            <div className={`${styles.categoryContainer} mt-4`}>
                {category.map(categoryItem => (
                    <div
                        key={categoryItem.id}
                        className={`${styles.categoryCard} ${selectedCategory && selectedCategory.id === categoryItem.id ? styles.selected : ''}`}
                        onClick={() => handleCategoryClick(categoryItem)}>
                        <div className={styles.imageTextContainer}>
                            <img src={`/images/${categoryItem.image}`} alt={categoryItem.name} className={styles.categoryImage} />
                            <p className={`${styles.categoryText} mt-1`}>{categoryItem.name}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* food cards */}
            <div className={`${styles.foodContainer} mt-4 mb-4`}>
                {food.map(fooditem => (
                    <Link to={`/food/${fooditem.Id}`} key={fooditem.Id}>
                        <div className={styles.foodCard}>
                            <i className={`fas fa-heart ${styles.faHeart} ${styles.foodCardHeader}`}></i>
                            <img src={`/images/${fooditem.image}`} alt={fooditem.name} className={`${styles.foodImage} mb-2`} />
                            <div className={`${styles.foodCardFooter} mt-2`}>
                                <h3 className={styles.foodCardText}>{fooditem.name}</h3>
                                <p className={styles.foodCardPrice}>${fooditem.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FoodList;