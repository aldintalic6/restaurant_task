import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from './FeaturedFood.module.css';

const FeaturedRecipes = () => {
    const [category, setCategory] = useState([]);
    const [food, setFood] = useState([]); // contains max. 3 filtered food entries 
    const [allFood, setAllFood] = useState([]); // contains all the food
    const [restaurant, setRestaurant] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

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
                setAllFood(data);
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
            const element = foodArrayCopy.splice(randomIndex, 1)[0]; // splice - removes the random food from the array, so it isnt selected again
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

    // Handle category click
    const handleCategoryClick = (category) => {
        if (selectedCategory && selectedCategory.id === category.id) {
            setSelectedCategory(null);
            selectRandomFood(allFood)
        }
        else if (category) {
            setSelectedCategory(category);
            const filteredFood = allFood.filter(foodItem => foodItem.categoryId === category.id);
            selectRandomFood(filteredFood);
        }
    };

    return (
        <div className={styles.featuredRecipesContainer}>
            {/* picture with text and login/register button cards */}
            <div className={styles.pictureTextContainer}>
                <div className={styles.pictureTextContainerButtons}>
                    <h3 className={styles.pictureTextContainerButtonsText}>Feels Like Home,</h3>
                    <h3 className={styles.pictureTextContainerButtonsText}>Tastes Like Paradise</h3>
                    <h5 className={`${styles.pictureTextContainerButtonsSmallText} ${styles.mt3} mb-3`}>
                        Sign in or create an account. It's completely free!
                    </h5>
                    <div className={styles.buttonsContainer}>
                        <Link className={styles.pictureTextContainerLoginButton} to="/signin">Sign In</Link>
                        <Link className={styles.pictureTextContainerRegisterButton} to="/register">Register</Link>
                    </div>
                </div>
            </div>

            <div className={`${styles.textContainer} mt-4`}>
                <p className={styles.smallText}>Featured Food</p>
                <Link className={styles.stylesLink} to="/food">View all</Link>
            </div>

            {/* food cards */}
            <div className={`${styles.foodContainer} mt-4`}>
                {food.map(fooditem => (
                    <Link key={fooditem.Id} to={`food/${fooditem.Id}`}>
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

            <div className={`${styles.textContainer} mt-4`}>
                <p className={styles.smallText}>Featured Restaurants</p>
                <Link className={styles.stylesLink} to="/food">View all</Link>
            </div>

            {/* restaurants cards */}
            <div className={`${styles.restaurantContainer} ${styles.mt4} mb-4`}>
                {restaurant.map(restaurantItem => (
                    <Link key={restaurantItem.Id} to={`restaurant/${restaurantItem.Id}`}>
                        <div className={styles.restaurantCard}>
                            <img src={`/images/${restaurantItem.image}`} alt={restaurantItem.name} className={`${styles.restaurantImage} mb-2`} />
                            <div className={`${styles.restaurantCardFooter} mt-2`}>
                                <h3 className={styles.restaurantCardText}>{restaurantItem.name}</h3>
                                <p className={`${styles.restaurantCardAddress} ${styles.mt1}`}>{restaurantItem.address}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FeaturedRecipes;