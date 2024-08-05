import React from "react";
import { useState } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FoodList from "../../components/FoodList/FoodList";

import './FoodScreen.css';

const FoodScreen = () => {
    return (
        <div className="food-screen-container">
            <Header />
            <FoodList />
            <Footer />
        </div>
    );
};

export default FoodScreen;