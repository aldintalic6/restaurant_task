import React from 'react';
import './RegisterForm.css';

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
                    <button type="submit" className="btn btn-block mt-5">Register now</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
