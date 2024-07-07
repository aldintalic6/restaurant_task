import React from "react";
import { useEffect, useState } from "react";

function FoodList() {
    const [food, setFood] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/food')
        .then(response => response.json())
        .then(data => setFood(data))
        .catch(error => console.error('Error fetching restaurants:', error));
    }, [])

    return (
        <div>
            <h2>Food</h2>
            <ul>
                {food.map(food => (
                    <li key={food.id}>{food.name} - {food.price} - {food.restaurantId}</li>
                ))}
            </ul>
        </div>
    )
};
export default FoodList;