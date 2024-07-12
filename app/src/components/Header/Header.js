import React from "react";
import { Link, useLocation } from "react-router-dom";

import styles from './Header.module.css';

const Header = () => {
    const location = useLocation();
    
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
        </div>
    );
};

export default Header;