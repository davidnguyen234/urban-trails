import React, {Component } from 'react';
import {Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Navigation from './Navigation';
import { Link } from "react-router-dom";
import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TrailsList from './TrailsList';
import SlidingPanel from 'react-sliding-side-panel';


export class MapContainer extends Component {
    state = {
      showSidePanel: false,
      activeTrail: {},
      selectedTrail: {},
      trailLocations: []
    };
  
    componentDidMount() {
      fetch(`${process.env.REACT_APP_FIRESTORE_URL}`)
      .then(response => response.json())
      .then(data => this.setState({ trailLocations: data.documents}))
  };
  
  renderTrails() {
    return this.state.trailLocations.map((trails, i) => {
      const trailLocation = {
        id: trails.name.substring(65,85), 
        latitude: trails.fields.location.geoPointValue.latitude,
        longitude: trails.fields.location.geoPointValue.longitude, 
        title: trails.fields.title.stringValue,
        length: trails.fields.length.stringValue,
        description: trails.fields.description.stringValue,
        image: trails.fields.image.stringValue
      }
      return <Marker
            key={i}
            onClick={this.trailClick}
            id={trailLocation.id}
            position={{
              lat: trailLocation.latitude,
              lng: trailLocation.longitude
            }}
            image={trailLocation.image}
            title={trailLocation.title}
            length={trailLocation.length}
            description={trailLocation.description.substring(0, 250)}
            latitude={trailLocation.latitude}
            longitude={trailLocation.longitude}
          />
      })
  };
  
  trailClick = (props, marker) =>
  this.setState({
    selectedTrail: props,
    activeTrail: marker,
    showSidePanel: true
  });
  
  mapClick = () => {
  if (this.state.showSidePanel) {
    this.setState({
      showSidePanel: false,
      activeTrail: null
    })
  }
  };
  
  render() {
  return (
    <div>
        <div>
          <Navigation />    
        </div>
      <div>
        <div>
        </div>
      <Container>
        <Row id="row">
          <Col id="slide-panel" sm={8} md={8} lg={2}>
            <SlidingPanel 
            type={'left'} 
            size={200}
            marker={this.state.activeTrail}
            isOpen={this.state.showSidePanel}
            >
            <div>
            <Col>
            <img src={this.state.selectedTrail.image} style={{maxWidth: 400}}/><br/><br/>
            </Col>  
            <h4>{this.state.selectedTrail.title}</h4>
            <p>Length: {this.state.selectedTrail.length} miles</p>  
            <p>{this.state.selectedTrail.description}...</p>
                                <Link to={`/trails/${this.state.selectedTrail.id}`}>
                    <p>Read more</p>
                    </Link><br /><br />
            
            </div>
            <TrailsList />
            </SlidingPanel>
          </Col>
          <Col id="map">
            <Map 
            google={this.props.google}
            center={{
              lat: 47.64442,
              lng: -122.22979
            }}
            zoom={11}
            onClick={this.mapClick}
            >
            {this.renderTrails()}
            </Map>
            </Col>
        </Row>
      </Container>
      </div>
      <div>
      </div>
    </div>
    )}
  }
  
  export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })(MapContainer)
  
