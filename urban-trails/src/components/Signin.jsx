import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { Form, Button } from 'react-bootstrap';
import '../App.css';

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
            <div className="signin">
                <div>
                    <div className="title">
                    <h1>Urban Trails</h1>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button className="mb-3" variant="primary" type="submit">
                            Sign In
                        </Button>
                        <p>Don't have an account? <Link to="/signup" className="underline">Sign up</Link></p>
                    </Form>
                </div>
            </div> 
        </div>
    )
}

export default Signin;