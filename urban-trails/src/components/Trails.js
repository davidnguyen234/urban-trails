import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const Trails = () => {
    const [trails, setTrails] = useState([]);
    const trailsCollectionRef = collection(db, "trails")
    useEffect(() => {
        
        const getTrails = async () => {
            const data = await getDocs(trailsCollectionRef);
            setTrails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
            console.log(data.docs)
        };
        getTrails()
    }, [])

    return (
        <div>
            <h1>Trails</h1>
            {trails.map((trail) => {
                return (
                    <div>
                        {" "}
                        <h3>{trail.name}</h3>
                        <img src={trail.image} alt="trail" />
                        <p>{trail.description}</p>
                        <p>Coordinates: {trail.location.latitude}, {trail.location.longitude}</p>
                    </div>    
                ) 
            })}
        </div>
    )
}

export default Trails;