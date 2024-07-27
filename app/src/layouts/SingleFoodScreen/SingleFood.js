import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FoodDetails from "../../components/FoodDetails/FoodDetails";

import './SingleFood.css';

const SingleFood = () => {
    return (
        <div className="singlefood-screen-container">
            <Header />
            <FoodDetails />
            <Footer />
        </div>
    );
};

export default SingleFood;