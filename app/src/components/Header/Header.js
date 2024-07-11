import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
    
    return(
        <div className="headerContainer ">
            <div className="linksContainer p-5">
                <Link className="links" to="/">Home</Link>
                <Link className="links" to="/restaurants">Restaurants</Link>
                <Link className="links" to="/food">Food</Link>
            </div>
            <div className="signInContainer p-5">
                <Link className="signInLink" to="/register">Sign In</Link>
            </div>
        </div>
    );
};

export default Header;