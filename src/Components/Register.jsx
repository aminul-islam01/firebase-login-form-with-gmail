import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth'
import { Link } from 'react-router-dom';
import app from '../firebase.config';

const auth = getAuth(app);

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = (event) => {
        setError('');
        setSuccess('');
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const loggedUser = result.user;
                setSuccess('User login successful.');

                emailVerification();
                console.log(loggedUser)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
            });
            
    }

    const emailVerification = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert("please verified your email")
            });
    }

    return (
        <div className='w-25 mx-auto'>
            <h2>Please Register</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name='email' className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />

                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' className="form-control" id="password" placeholder="Password" required />
                </div>
                <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p><small>Already have an account? Please <Link to="/login">Login</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;