import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div>
            <div>
                <h1>Sign Up</h1>
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
                <button>Sign Up</button>
                <p>
                    Already have an account? <Link to="/" classname="underline">Sign in</Link> 
                </p>
            </form>
        </div> 
    )
}

export default Signup