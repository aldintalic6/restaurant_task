import React from "react";
import './App.css';
import { Link } from 'react-router-dom';

import RestaurantList from './RestaurantList';
import AddRestaurant from './AddRestaurant';
import FoodList from './FoodList';
import AddFood from './AddFood';
import RandomFood from './RandomFood';

const Home = () => {
    return (
        <div className="app-container"> 
         <div className="navBar mb-4">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/restaurants">Restaurants</Link>
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
        <h1>Welcome to My Restaurant App</h1>
        <div className='restraurantContainer'>
          <div className="section">
            <RestaurantList />
          </div>
          <div className="addRestaurantContainer">
            <AddRestaurant />
          </div>
        </div>
        <div className='foodContainer'>
          <div className="section">
            <FoodList />
          </div>
          <div className="addFoodContainer">
            <AddFood />
          </div>
        </div>
        <div className="randomFoodContainer">
          <RandomFood />
        </div>
    </div>
      );
};

export default Home;