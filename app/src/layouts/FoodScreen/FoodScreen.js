import React from "react";
import { useState } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FoodList2 from "../../components/FoodList/FoodList2";

import './FoodScreen.css';

const FoodScreen = () => {
    return (
        <div className="food-screen-container">
            <Header />
            <FoodList2 />
            <Footer />
        </div>
    );
};

export default FoodScreen;