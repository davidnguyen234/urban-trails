import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {signIn} = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await signIn(email, password)
            navigate('/map')
        } catch (e) {
            setError(e.message)
        }
    };


    return (
        <div>
        <div>
            <h1>Sign In</h1>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email Address</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email"/>
            </div>
            <div>
                <label>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password"/>
            </div>
            <button>Sign In</button>
            <p>
                Don't have an account? <Link to="/signup" className="underline">Sign up</Link> 
            </p>
        </form>
    </div> 
    )
}

export default Signin;