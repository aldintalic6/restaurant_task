import React from 'react';
import './RegisterForm.css';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    return (
        <div className='register-form-container'>
            <div className="register-form">
                <form>
                    <div className="form-group">
                        <label className='inputTitle' htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Username" required />
                    </div>
                    <div className="form-group">
                        <label className='inputTitle' htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="you@mail.com" required />
                    </div>
                    <div className="form-group">
                        <label className='inputTitle' htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" required />
                    </div>
                    <div className='register-footer-container'>
                        <button type="submit" className="register_btn btn btn-block mt-3">Register now</button>
                        <Link className="signInButton_register mt-2" to="/signin">Already have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
