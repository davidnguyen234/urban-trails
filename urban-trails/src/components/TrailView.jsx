import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, deleteDoc, doc, GeoPoint } from 'firebase/firestore';
import {useParams} from 'react-router-dom';


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
            {trails.filter(trail => trail.id === id).map((trail, i) => (
                <div key={i}>
                <img src={trail.image} alt="trail"/>
                        <h3>{trail.title}</h3>
                        <p>{trail.location.latitude}° N, {trail.location.longitude}° W</p>
                        <p>{trail.description}</p>
                </div>
            ))}
        </div>	
	)
}

export default TrailView;