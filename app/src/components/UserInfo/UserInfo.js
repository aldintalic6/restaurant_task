import React from "react";
import { useState } from "react";

import './UserInfo.css';

const UserInfo = () => {
    return (
        <div className="userInfoMainContainer">
            <div className="userContainer">
                <img src="/images/avatar2.jpeg" alt="useravatar" className="image"></img>
                <div className="informationContainer">
                    <p className="textContainer">Name</p>
                    <p className="answerContainer">testname</p>
                </div>
                <div className="informationContainer">
                    <p className="textContainer">Username</p>
                    <p className="answerContainer">testusername</p>
                </div>
                <div className="informationContainer">
                    <p className="textContainer">Email</p>
                    <p className="answerContainer">testemail</p>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;