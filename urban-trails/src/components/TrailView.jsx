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
                <Row xs lg ={20}>
                <h1 id="trail-view-title">{trail.title}</h1>
                </Row><br />
                <Row>
                <Col><h6>LENGTH</h6> {trail.length} miles</Col>
                <Col><h6>ELEVATION GAIN</h6> {trail.elevation} feet</Col>
                <Col><h6>HIGHEST POINT</h6> {trail.highestPoint} feet</Col>
                </Row><br /><br />                  
                <Row>
                <img src={trail.image} alt="trail"/>
                </Row><br />
                <Row>
                <p><strong>CO-ORDINATES:</strong> {trail.location.latitude}° N, {trail.location.longitude}° W</p>
                </Row><br />
                <Row>
                <p>{trail.description}</p>
                </Row><br />  
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