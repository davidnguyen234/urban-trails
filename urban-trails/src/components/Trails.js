import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, deleteDoc, doc, GeoPoint } from 'firebase/firestore';
import Navigation from './Navigation';
import '../App.css';
import { storage } from '../firebase-config';
import { ref, uploadBytes } from 'firebase/storage';
import {v4} from 'uuid';

const Trails = () => {
    const [newTitle, setNewTitle] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [newImage, setNewImage] = useState(null)
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

    const uploadImage = () => {
        if (newImage == null) return;
        const imageRef = ref(storage, `images/${newImage.name + v4()}`)
        uploadBytes(imageRef, newImage).then(() => {
            alert("Image Uploaded")
        })
    }
    
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
            <h1>Trails</h1>
            <input placeholder="Name" onChange={(event) => {
                setNewTitle(event.target.value);
            }}></input>
            <input placeholder="Description" onChange={(event) => {
                setNewDescription(event.target.value);
            }}></input>
            <input type="number" placeholder="Latitude" onChange={(event) => {
                setNewLatitude(event.target.value);
            }}></input>
            <input type="number" placeholder="Longitude" onChange={(event) => {
                setNewLongitude(event.target.value);
            }}></input>
            <input type="file" onChange={(event) => {
                setNewImage(event.target.files[0]);
            }}></input>
            <button onClick={uploadImage}>Upload Image</button>
            <button onClick={createTrail}>Add Trail</button><br/><br/><br/>

            {trails.map((trail) => {
                return (
                    <div>
                        {" "}
                        <img src={trail.image} alt="trail"/>
                        <h3>{trail.title}</h3>
                        <p>{trail.location.latitude}° N, {trail.location.longitude}° W</p>
                        <p>{trail.description}</p>
                        <button onClick={() => {deleteTrail(trail.id)}
                        }>Delete Trail</button><br/><br/><br/>
                    </div>    
                ) 
            })}
        </div>
    </div>
    )
}

export default Trails;
