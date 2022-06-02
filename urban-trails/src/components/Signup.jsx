import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {createUser} = UserAuth();

    const handleSubmit = async (e) => {
            e.preventDefault()
            setError('')
            try{
                await createUser(email, password) 
            } catch (e) {
                setError(e.message)
                console.log(e.message)
            }
    }

    return (
        <div>
            <div>
                <h1>Sign Up</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email Address</label>
                    <input onChange={(e) => setEmail(e.target.value)}type="email"/>
                </div>
                <div>
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)}type="password"/>
                </div>
                <button>Sign Up</button>
                <p>
                    Already have an account? <Link to="/" className="underline">Sign in</Link> 
                </p>
            </form>
        </div> 
    )
}

export default Signup