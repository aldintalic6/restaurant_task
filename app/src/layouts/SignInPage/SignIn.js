import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SignInForm from "../../components/SignInForm/SignInForm";

import './SignIn.css';

const SignIn = () => {
    return (
        <div className="signin-screen-container">
            <Header />
            <SignInForm />
            <Footer />
        </div>
    );
};

export default SignIn;