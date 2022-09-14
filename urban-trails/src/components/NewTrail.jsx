import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, GeoPoint } from 'firebase/firestore';
import Navigation from './Navigation';
import '../App.css';
import { storage } from '../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

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
        const imageRef = ref(storage, `${newImage.name + v4()}`)
        const result = await uploadBytes(imageRef, newImage);
        const downloadUrl = await getDownloadURL(result.ref);
        console.log(`uploadResult: ${JSON.stringify(downloadUrl)}`);

        return downloadUrl;

    }

    return (
        <div>
        <div>
        <Navigation />
        </div>
        <div className="content">
        <div id="create-trail-form">
        <Form>
                <Form.Group className="mb-3" controlId="formGridTitle">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={(event) => 
                setNewTitle(event.target.value)
            }/>
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridLatitude">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control onChange={(event) => setNewLatitude(event.target.value)
            } type="number" step=".00001" />
                </Form.Group>
                    <Form.Group as={Col} controlId="formGridLongitude">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control onChange={(event) => setNewLongitude(event.target.value)
            } type="number" step=".00001" />
                </Form.Group>
                </Row>
                    <Form.Group className="mb-3" controlId="formGridDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={(event) => setNewDescription(event.target.value)
            }/>
                </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image Upload</Form.Label>
                    <Form.Control type="file" onChange={(event) => setNewImage(event.target.files[0])
            }/>
                </Form.Group>
                
                <Button onClick={createTrail}>Add Trail</Button>
        </Form>
        </div>
        </div>       
        </div>     
    )
}

export default NewTrail;