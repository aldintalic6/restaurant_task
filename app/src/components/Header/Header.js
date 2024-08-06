import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

import styles from './Header.module.css';

import { useUser } from "../../contexts/UserContext";

const Header = () => {
    const { user, setUser } = useUser(); // user context
    const location = useLocation();
    const navigate = useNavigate()

    const handleLogout = () => {
        fetch('http://localhost:5001/logout', {
            method: 'POST',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Logout successful') {
                setUser(null);
                navigate('/signin');
            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
        });
    };

    return(
        <div className={styles.headerContainer}>
            <div className={`${styles.linksContainer} p-5`}>
                <Link className={styles.links} to="/">Home</Link>
                <Link className={styles.links} to="/restaurants">Restaurants</Link>
                <Link className={styles.links} to="/food">Food</Link>
            </div> 
            {!user && location.pathname !== '/register' && location.pathname !== '/signin' && (
                <div className={`${styles.signInContainer} p-5 `}>
                    <Link className={styles.signInLink} to="/signin">Sign In</Link>
                </div>
            )}
            {user && location.pathname !== '/register' && location.pathname !== '/signin' && (
                <div className={`${styles.signInContainer} p-5`}>
                    <button className={styles.signOutLink} onClick={handleLogout}>Logout</button>
                    <Link className={styles.signOutLink} to="/profile">Profile</Link>
                </div>
            )}
        </div>
    );
};

export default Header;