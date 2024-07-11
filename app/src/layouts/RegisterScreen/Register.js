import React from "react";
import './Register.css';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const Register = () => {

    return (
        <div className="register-screen-container">
            <Header />
            <RegisterForm />
            <Footer />
        </div>
    );
};

export default Register;