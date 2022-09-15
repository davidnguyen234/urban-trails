import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, deleteDoc, doc, GeoPoint } from 'firebase/firestore';
import Navigation from './Navigation';
import {useParams} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


const TrailView = () => {
    const { id } = useParams();
    const [trails, setTrails] = useState([]);
    const trailsCollectionRef = collection(db, "trails")
	
    useEffect(() => {
        const getTrails = async () => {
            const data = await getDocs(trailsCollectionRef);
            setTrails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getTrails()
    }, [])

	return (
        <div>
        <div>
        <Navigation />
        </div>
        <Container id="trail-vew-container">
        <Row className="justify-content-md-center">
          <Col xs lg="8" >
        <div>
            {trails.filter(trail => trail.id === id).map((trail, i) => (
                <div key={i}>
                <Row>
                <img src={trail.image} alt="trail"/>
                </Row>
                <Row>
                <h1>{trail.title}</h1>
                </Row>
                <Row>
                <p>{trail.location.latitude}° N, {trail.location.longitude}° W</p>
                </Row>
                <Row>
                <p>{trail.description}</p>
                </Row>  
                </div>
            ))}
        </div>	
        </Col>
      </Row>
    </Container>
    </div>
	)
}

export default TrailView;