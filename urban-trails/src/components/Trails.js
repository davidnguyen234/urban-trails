import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, deleteDoc, doc, GeoPoint } from 'firebase/firestore';
import Navigation from './Navigation';
import '../App.css';

const Trails = () => {
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
        <div className="content">
        </div>
        <div className="wrapper">
            {trails.map((trail) => {
                return (
                    <div className="wrapper">
                    <div>
                    <div className="card">
                    <div className="card__body">
                    <img className="card__image" src={trail.image}></img>
                    <h5 className="card__title">{trail.title}</h5>
                    <p className="card__length">Length: {trail.length} miles</p>
                    <p className="card__description">{trail.description.substring(0, 200)}...</p>
                    </div>
                    <Link to={`/trails/${trail.id}`}>
                    <button className="card__btn">View Trail</button>
                    </Link>
                    </div>
                    </div>
                    </div>

                
                ) 
            })}
        </div>
    </div>

    )
}

export default Trails;
