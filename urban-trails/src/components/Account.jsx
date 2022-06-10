import React from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import '../App.css';

const Account = () => {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logout()
            navigate('/')
            console.log('You are logged out')
        } catch (e) {
                console.log(e.message)
        }
    }
    
    return (
        <div>
            <div>
            <Navigation />
            </div>
            <div className="content">
            <h1>Account</h1>
            <p>Email: {user && user.email}</p>
            <button onClick={handleLogOut}>Logout</button>
            </div>
        </div>
    )
}

export default Account;