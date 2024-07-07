import React from "react";
import { useEffect, useState } from "react";

function AddRestaurant() {
    const[name, setName] = useState('');
    const[address, setAddress] = useState('');
    const[telephone, setTelephone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5001/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, address, telephone }),
            })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setName('');
            setAddress('');
            setTelephone('');
        })
        .catch(error => {
            console.error('Error adding restaurant:', error);
        });
    };

    return (
        <div>
          <h2>Add Restaurant</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            <input type="text" placeholder="Telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
            <button type="submit">Add Restaurant</button>
          </form>
        </div>
      );

}
export default AddRestaurant;