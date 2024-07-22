import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import './FeaturedFood.css';

const FeaturedRecipes = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/category')
            .then(response => response.json())
            .then(data => setCategory(data))
            .catch(error => console.error("Error fetching restaurans ", error));
    }, []);

    console.log("Categories", category);

    return (
        <div className="featured-recipes-container">
            <div className="text-container">
                <p className="categoryText">Category</p>
                <Link className="styles-link" to="/food">View all</Link>
            </div>
            <div className="category-container">
                {category.map(categoryitem => (
                    <div key={categoryitem.id} className="category-card">
                        <div className="image-text-container">
                            <img src="../../images/burger.png" alt="Burger" className="category-image" />
                            <p className="category-text mt-1">{categoryitem.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedRecipes;