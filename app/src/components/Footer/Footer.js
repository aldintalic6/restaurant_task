import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
    return (
        <div className="footerContainer p-5">
            <span className="mainText">Powered by Aldin</span>
            <span className="mainText">©Copyright. All rights reserved.</span>
        </div>
    );
};
export default Footer;