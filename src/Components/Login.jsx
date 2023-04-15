import React from 'react';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase.config';
import { Link } from 'react-router-dom';


const Login = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const auth = getAuth(app);

    const handleLogin = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const loggedUser = result.user;
                loggedUser.displayName = name;
                setSuccess('User login successful.');
                setError('');
                console.log(loggedUser)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
            });

    };

    return (
        <div className='w-25 mx-auto'>
            <h2>Please Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name='email'className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />

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
            <p><small>Forget Password? Please <button className='btn btn-link'>Reset Password</button></small></p>
            <p><small>New to this website? Please <Link to="/register">Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;