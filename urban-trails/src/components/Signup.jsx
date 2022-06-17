import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { Form, Button } from 'react-bootstrap';
import '../App.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {createUser} = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
            e.preventDefault();
            setError('')
            try {
                await createUser(email, password)
                navigate('/map') 
            } catch (e) {
                setError(e.message)
            }
    }

    return (
        <div>
            <div className ="signup">
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
                            Sign Up
                        </Button>
                        <p>Already have an account? <Link to="/" className="underline">Sign in</Link></p>
                    </Form>
                </div>
            </div> 
        </div>
    )
}

export default Signup