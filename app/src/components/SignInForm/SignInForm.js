import React from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

import { useUser } from "../../contexts/UserContext";

import './SignInForm.css';

const SignInForm = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const { fetchUserData } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usernameOrEmail, password }),
            credentials: 'include',

        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    toast.error(data.error);
                }
                else {
                    toast.success('Login successful!');
                    fetchUserData();
                }
            })
            .catch(error => {
                console.error('Error logging in:', error);
                toast.error('Error logging in. Please try again later.');
            })
    };

    return (
        <div className="signin-form-container">
            <div className="signin-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className='inputTitle' htmlFor="usernameoremail">Username or Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="usernameoremail"
                            placeholder="Username or Email"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className='inputTitle' htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='signin-footer-container'>
                        <button type="submit" className="signin_btn btn btn-block mt-3">Sign In</button>
                        <Link className="registerLink_signin mt-2" to="/register">Don't have an account yet?</Link>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignInForm;