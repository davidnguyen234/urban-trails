import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { Link } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
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
      <div >
          {trails.map((trail) => {
              return (
                  <div>
                      {" "}
                      <img src={trail.image} alt="trail" style={{maxWidth: 400}}/><br/><br/>
                      <h4>{trail.title}</h4>
                      <p>Length: {trail.length} miles</p>  
                      <p>{trail.description.substring(0, 250)}...</p>
                      <Link to={`/trails/${trail.id}`}>
                      <p>Read more</p>
                      </Link><br/><br/>
                  </div>    
              ) 
          })}
      </div>
  </div>
  )
}

export default TrailsList;