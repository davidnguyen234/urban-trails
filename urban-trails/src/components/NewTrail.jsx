import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, GeoPoint } from 'firebase/firestore';
import Navigation from './Navigation';
import '../App.css';
import { storage } from '../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const NewTrail = () => {
    const [newTitle, setNewTitle] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [newImage, setNewImage] = useState("")
    const [newLatitude, setNewLatitude] = useState(0)
    const [newLongitude, setNewLongitude] = useState(0)
    const [trails, setTrails] = useState([]);
    const trailsCollectionRef = collection(db, "trails")
    
    const createTrail = async () => {
        const imageUrl = await uploadImage();
        await addDoc(trailsCollectionRef, {title: newTitle, description: newDescription,
            location: new GeoPoint(newLatitude, newLongitude),
            image: imageUrl})
    }
  
    useEffect(() => {
        
        const getTrails = async () => {
            const data = await getDocs(trailsCollectionRef);
            setTrails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getTrails()
    }, [])

    const uploadImage = async () => {
        if (newImage == null) return;
        const imageRef = ref(storage, `${newImage.name }`)
        const result = await uploadBytes(imageRef, newImage);
        const downloadUrl = await getDownloadURL(result.ref);
        console.log(`uploadResult: ${JSON.stringify(downloadUrl)}`);

        return downloadUrl;

    }

    return (
        <div>
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
            <button onClick={createTrail}>Add Trail</button><br/><br/><br/>
            </div>
    </div>
    <div>
         <input type="file" onChange={(event) => {
                setNewImage(event.target.files[0]);
            }}/> 
    </div>
    </div>
         
    )
}

export default NewTrail;