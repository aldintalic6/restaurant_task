import React, { useState, useEffect } from "react";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

import styles from './Header.module.css';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        // Check if token exists in cookies to determine login status
        const token = Cookies.get('token');
        setIsLoggedIn(!!token); // !!token converts to boolean
    }, []);

    const handleLogout = () => {
        // Clear the token by removing the cookie
        Cookies.remove('token');
        setIsLoggedIn(false); // Update login status
        navigate('/signin');
    };
    
    return(
        <div className={styles.headerContainer}>
            <div className={`${styles.linksContainer} p-5`}>
                <Link className={styles.links} to="/">Home</Link>
                <Link className={styles.links} to="/restaurants">Restaurants</Link>
                <Link className={styles.links} to="/food">Food</Link>
            </div>
            {location.pathname !== '/register' && location.pathname !== '/signin' && (
                <div className={`${styles.signInContainer} p-5 `}>
                    <Link className={styles.signInLink} to="/signin">Sign In</Link>
                </div>
            )}
            {isLoggedIn && (
                <div className={`${styles.signInContainer} p-5`}>
                    <button className={styles.signInLink} onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default Header;