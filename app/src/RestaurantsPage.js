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
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Restaurants</a>
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
                        <a href="#" className="card-link">View Restaurant</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      );
};

export default RestaurantsPage;