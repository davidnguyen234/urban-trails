import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, deleteDoc, doc, GeoPoint } from 'firebase/firestore';
import '../App.css';

const TrailsList = () => {
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
      </div>
      <div className="content">
          {trails.map((trail) => {
              return (
                  <div>
                      {" "}
                      <img src={trail.image} alt="trail" style={{maxWidth: 300}}/><br/><br/>
                      <h4>{trail.title}</h4><br/>  
                      <p>{trail.description}</p>
                      <p>{trail.location.latitude}° N, {trail.location.longitude}° W</p><br/><br/>
                  </div>    
              ) 
          })}
      </div>
  </div>
  )
}

export default TrailsList;