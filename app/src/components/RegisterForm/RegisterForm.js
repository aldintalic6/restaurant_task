import React from 'react';
import './RegisterForm.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    toast.error(data.error); 
                } else {
                    toast.success('User registered successfully!'); 
                    setUsername('');
                    setEmail('');
                    setPassword('');
                }
            })
            .catch(error => {
                console.error('Error registering user:', error);
                toast.error('Error registering user. Please try again later.');
            });
    };

    return (
        <div className='register-form-container'>
            <div className="register-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className='inputTitle' htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className='inputTitle' htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="you@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <div className='register-footer-container'>
                        <button type="submit" className="register_btn btn btn-block mt-3">Register now</button>
                        <Link className="signInButton_register mt-2" to="/signin">Already have an account?</Link>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default RegisterForm;
