import React from 'react';
import { Link } from 'react-router-dom';

const Signin = () => {
    return (
        <div>
        <div>
            <h1>Sign In</h1>
        </div>
        <form>
            <div>
                <label>Email Address</label>
                <input type="email"/>
            </div>
            <div>
                <label>Password</label>
                <input type="password"/>
            </div>
            <button>Sign In</button>
            <p>
                Don't have an account? <Link to="/signup" classname="underline">Sign up</Link> 
            </p>
        </form>
    </div> 
    )
}

export default Signin;