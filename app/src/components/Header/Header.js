import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

import styles from './Header.module.css';

import { useUser } from "../../contexts/UserContext";

const Header = () => {
    const { user, setUser } = useUser(); // user context
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()

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
            {!user && location.pathname !== '/register' && location.pathname !== '/signin' && (
                <div className={`${styles.signInContainer} p-5 `}>
                    <Link className={styles.signInLink} to="/signin">Sign In</Link>
                </div>
            )}
            {user && (
                <div className={`${styles.signInContainer} p-5`}>
                    <button className={styles.signOutLink} onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default Header;