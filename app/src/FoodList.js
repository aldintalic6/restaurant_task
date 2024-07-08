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
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {food.map(food => (
                        <tr>
                            <th>{food.name}</th>
                            <th>{food.price}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};
export default FoodList;