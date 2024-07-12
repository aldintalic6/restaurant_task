import React from "react";
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={`${styles.footerContainer} p-5`}>
            <span className={styles.mainText}>Powered by Aldin</span>
            <span className={styles.mainText}>©Copyright. All rights reserved.</span>
        </div>
    );
};
export default Footer;