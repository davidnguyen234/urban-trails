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
import Container from 'react-bootstrap/Container';

const NewTrail = () => {
    const [newTitle, setNewTitle] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [newImage, setNewImage] = useState("")
    const [newLatitude, setNewLatitude] = useState(0)
    const [newLongitude, setNewLongitude] = useState(0)
    const [newLength, setNewLength] = useState(0)
    const [newElevationGain, setNewElevationGain] = useState(0)
    const [newHighestPoint, setNewHighestPoint] = useState(0)
    const [trails, setTrails] = useState([]);
    const trailsCollectionRef = collection(db, "trails")
    
    const createTrail = async () => {
        const imageUrl = await uploadImage();
        await addDoc(trailsCollectionRef, {title: newTitle, description: newDescription, length: newLength, elevation: newElevationGain, highestPoint: newHighestPoint, location: new GeoPoint(newLatitude, newLongitude),
            image: imageUrl});
            refreshPage()
            alert("Trail Added")      
    }

    const refreshPage = () => {
        window.location.reload(false);
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
        <div >
    <Container id="create-trail-container">
      <Row className="justify-content-md-center">
        <Col xs lg="6" >
        <h1 id="add-trail-title">Add Trail</h1>
        <Form>
                <Form.Group className="mb-3" controlId="formGridTitle">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={(event) => 
                setNewTitle(event.target.value)
            }/>
                </Form.Group>
                <Row className="mb-3">
                    <Col>
                    <Form.Group as={Col} controlId="formGridLength">
                    <Form.Label>Length (miles)</Form.Label>
                    <Form.Control onChange={(event) => setNewLength(event.target.value)
            } type="number" step=".00001" />
                    </Form.Group>
                    </Col>
                    <Col md="auto">
                    <Form.Group as={Col} controlId="formGridElevation">
                    <Form.Label>Elevation (feet)</Form.Label>
                    <Form.Control onChange={(event) => setNewElevationGain(event.target.value)
            } type="number" step=".00001" />
                    </Form.Group>
                    </Col>
                    <Col md="auto">
                    <Form.Group as={Col} controlId="formGridHighestPoint">
                    <Form.Label>Highest Point (feet)</Form.Label>
                    <Form.Control onChange={(event) => setNewHighestPoint(event.target.value)
            } type="number" step=".00001" />
                    </Form.Group>
                    </Col>                
                </Row>                
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
                    <Form.Control as="textarea" rows={8} onChange={(event) => setNewDescription(event.target.value)
            }/>
                </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image Upload</Form.Label>
                    <Form.Control type="file" onChange={(event) => setNewImage(event.target.files[0])
            }/>
                </Form.Group>
                
                <Button onClick={createTrail} >Submit</Button>

        </Form>
        </Col>
      </Row>
    </Container>
        </div>
        </div>       
        </div>     
    )
}

export default NewTrail;