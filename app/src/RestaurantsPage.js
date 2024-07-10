import React from "react";
import './RestaurantsPage.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import RestaurantsLooper from "./components/RestaurantsLooper";

const RestaurantsPage = () => {

    return (
        <div className="mainContainer">
            <Header />
            <RestaurantsLooper />
            <Footer />
        </div>
    );
};

export default RestaurantsPage;