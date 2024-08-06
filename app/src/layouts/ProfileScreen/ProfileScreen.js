import React from "react";

import './ProfileScreen.css';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import UserInfo from "../../components/UserInfo/UserInfo";

const ProfileScreen = () => {

    return (
        <div className="profileScreenContainer">
            <Header />
            <UserInfo />
            <Footer />
        </div>
    );
};

export default ProfileScreen;