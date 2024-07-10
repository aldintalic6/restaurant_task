import React from "react";
import { useEffect, useState } from "react";
import './components/RandomFood.css';

function RandomFood() {

    const[food, setFood] = useState([]);
    const[randomFood, setRandomFood] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5001/food')
        .then(response => response.json())
        .then(data => setFood(data))
        .catch(error => console.error('Error fetching restaurants!', error))
    }, [])

    const getRandomFood = () => {
        if (food.length > 0) {
            const randomIndex = Math.floor(Math.random() * food.length);
            const selectedFood = food[randomIndex];
            setRandomFood(selectedFood);
        }
    };

    return (
        <div className="randomFoodContainer">
            <h2>Random food</h2>
            <div className="buttonContainer">
                <button onClick={getRandomFood} class="btn btn-success">Generate</button>
                <button class="btn btn-danger ml-3" onClick={() => setRandomFood(null)}>Clear</button>
            </div>
            {randomFood && (
                <div>
                    <p>Name: {randomFood.name}</p>
                    <p>Price: {randomFood.price}</p>
                </div>
            )}
        </div>
    ); 
};
export default RandomFood;