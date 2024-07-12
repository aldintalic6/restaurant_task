import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Header.css';

const Header = () => {
    const location = useLocation();
    
    return(
        <div className="headerContainer ">
            <div className="linksContainer p-5">
                <Link className="links" to="/">Home</Link>
                <Link className="links" to="/restaurants">Restaurants</Link>
                <Link className="links" to="/food">Food</Link>
            </div>
            {location.pathname !== '/register' && location.pathname !== '/signin' && (
                <div className="signInContainer p-5">
                    <Link className="signInLink" to="/register">Sign In</Link>
                </div>
            )}
        </div>
    );
};

export default Header;