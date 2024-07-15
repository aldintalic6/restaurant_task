import React from "react";
import { Link } from "react-router-dom";

import './SignInForm.css';

const SignInForm = () => {
    return (
        <div className="signin-form-container">
            <div className="signin-form">
                <form>
                    <div className="form-group">
                        <label className='inputTitle' htmlFor="usernameoremail">Username or Email</label>
                        <input type="text" className="form-control" id="usernameoremail" placeholder="Username or Email" required />
                    </div>
                    <div className="form-group">
                        <label className='inputTitle' htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" required />
                    </div>
                    <div className='signin-footer-container'>
                        <button type="submit" className="signin_btn btn btn-block mt-3">Sign In</button>
                        <Link className="registerLink_signin mt-2" to="/register">Don't have an account yet?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInForm;