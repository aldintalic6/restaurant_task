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
                <div class="form-group">
                    <label for="nameInput">Name</label>
                    <input type="text" class="form-control" id="inputName" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div class="form-group">
                    <label for="addressInput">Address</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                </div>
                <div class="form-group">
                    <label for="telephoneInput">Telephone</label>
                    <input type="text" class="form-control" id="inputTelephone" placeholder="Enter telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} required/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
      );

}
export default AddRestaurant;