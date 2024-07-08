import React, { useState, useEffect } from 'react';

function AddFood() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [restaurantId, setRestaurantId] = useState('');
    const [restaurants, setRestaurants] = useState([]);

    // get all restaurants
    useEffect(() => {
        fetch('http://localhost:5001/restaurants')
            .then(response => response.json())
            .then(data => setRestaurants(data))
            .catch(error => console.error('Error fetching restaurants:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5001/food', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, restaurantId }),
        }) 
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setName('');
            setPrice('');
            setRestaurantId('');
        })
        .catch(error => {
            console.error('Error adding food:', error);
        });
    };

    return (
        <div>
            <h2>Add Food</h2>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="nameInput">Name</label>
                    <input type="text" class="form-control" id="inputName" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div class="form-group">
                    <label for="priceInput">Price</label>
                    <input type="text" class="form-control" id="inputPrice" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} required/>
                </div>
                <div class="form-group">
                    <label for="restaurantChoose">Select a restaurant</label>
                    <select value={restaurantId} onChange={(e) => setRestaurantId(e.target.value)} class="form-control" id="chooseRestaurant" required>
                        {restaurants.map(restaurant => (
                            <option key={restaurant.Id} value={restaurant.Id}>{restaurant.name}</option> 
                        ))}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Add food</button>
            </form>
        </div>
    );
}

export default AddFood;

