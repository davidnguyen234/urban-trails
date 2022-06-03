import React from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
            <h1>Account</h1>
            <p>Email: {user && user.email}</p>
            <button onClick={handleLogOut}>Logout</button>
        </div>
    )
}

export default Account;