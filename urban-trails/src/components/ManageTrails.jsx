import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, deleteDoc, doc, GeoPoint } from 'firebase/firestore';
import Navigation from './Navigation';
import '../App.css';

const ManageTrails = () => {
    const [newTitle, setNewTitle] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [newImage, setNewImage] = useState("")
    const [newLatitude, setNewLatitude] = useState(0)
    const [newLongitude, setNewLongitude] = useState(0)
    const [trails, setTrails] = useState([]);
    const trailsCollectionRef = collection(db, "trails")
    
    const createTrail = async () => {
        await addDoc(trailsCollectionRef, {title: newTitle, description: newDescription,
            location: new GeoPoint(newLatitude, newLongitude),
            image: newImage})
    }

    const deleteTrail = async (id) => {
        const trailDoc = doc(db, "trails", id); 
        await deleteDoc(trailDoc)
    };
    
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
                    <h4 className="card__title">{trail.title}</h4>
                    <Link to={`/trails/${trail.id}`}>
                    <button className="card__btn">View Trail</button>
                    </Link>
                    </div>
                    <button className="card__btn" onClick={() => {deleteTrail(trail.id)}
                    }>Delete Trail</button>
                    </div>  
                    </div>
                    <div>
                    </div>    
                    </div>
                   
                ) 
            })}
        </div>
    </div>

    )
}

export default ManageTrails;
