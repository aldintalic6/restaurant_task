import React from "react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import './RestaurantsPage.css';

const RestaurantsPage = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/restaurants')
            .then(response => response.json())
            .then(data => setRestaurants(data))
            .catch(error => console.error('Error fetching restaurants:', error));
    }, []);

    // delete restaurant function

    const deleteRestaurant = (id) => {
        fetch(`http://localhost:5001/restaurants/${id}`, {
            method: 'DELETE' 
        })
            .then(response => response.json())
            .then(data => {
                // Assuming the server responds with a success message
                console.log('Success:', data);
                setRestaurants(restaurants.filter(restaurant => restaurant.Id !== id));
            })
            .catch(error => console.error('Error deleting restaurant:', error));
    };

    return (
        <div className="mainContainer">
            {/* navbar */}
            <div className="navBar mb-4">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item ">
                                <Link className="nav-link active" to="/restaurants">Restaurants</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Food</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
            {/* end navbar */}

            <div className="restaurantContainer">
                {restaurants.map(restaurant => (
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">{restaurant.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{restaurant.telephone}</h6>
                            <p className="card-text">{restaurant.address}</p>
                            <div className="restaurantFooter">
                                <a href="#" className="card-link">View Restaurant</a>
                                <div className="buttonContainer">
                                    <a href="#" class="btn btn-info">Edit</a>
                                    <button className="btn btn-danger ml-3" onClick={() => deleteRestaurant(restaurant.Id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantsPage;