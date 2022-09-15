import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Navigation from './Navigation';
import '../App.css';
import Col from 'react-bootstrap/Col';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ManageTrails = () => {
    const [trails, setTrails] = useState([]);
    const trailsCollectionRef = collection(db, "trails")
    
    const refreshPage = () => {
        window.location.reload(false);
      }

    const deleteTrail = async (id) => {
        const trailDoc = doc(db, "trails", id); 
          confirmAlert(
            {
            title: 'Confirm to delete',
            buttons: [
              {
                label: 'Yes',
                onClick: () =>  deleteDoc(trailDoc)
              },
              {
                label: 'No',
              }
            ] 
          });  
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
                    <Col>
                    <div className="wrapper">
                        <div>
                            <div className="card">
                            <div className="card__body">
                            <img className="card__image" src={trail.image}></img>
                            <h5 className="card__title">{trail.title}</h5>
                            <Link to={`/trails/${trail.id}`}>
                            </Link>
                            </div>
                            <Col className="manage_card__btn">
                            <Link to={`/trails/${trail.id}`}>
                            <button className="view_card__btn">View</button>
                            </Link>
                            <button className="edit_card__btn" onClick={() => {}
                            }>Edit</button>
                            <button className="delete_card__btn" onClick={() => {deleteTrail(trail.id)}
                            }>Delete</button>
                            </Col>
                            </div>  
                        </div>
                    </div>
                    </Col>
                ) 
            })}
        </div>
    </div>

    )
}

export default ManageTrails;
