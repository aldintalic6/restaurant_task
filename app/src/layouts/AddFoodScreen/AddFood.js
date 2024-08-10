import React from "react";
import { useState } from "react";

import Header from "../../components/Header/Header";
import AddFoodComponent from "../../components/AddFoodComponent/AddFoodComponent";
import Footer from "../../components/Footer/Footer";

import './AddFood.css';

const AddFood = () => {

    return (
        <div className="AddFoodContainer">
            <Header />
            <AddFoodComponent />
            <Footer />
        </div>

    );
};
export default AddFood;