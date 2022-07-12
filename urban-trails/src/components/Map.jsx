import React, {Component } from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from "google-maps-react";
import Navigation from './Navigation';
import '../App.css';

export class MapContainer extends Component {
    state = {
      showInfoWindow: false,
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
        id: trails.name, 
        latitude: trails.fields.location.geoPointValue.latitude,
        longitude: trails.fields.location.geoPointValue.longitude, 
        title: trails.fields.title.stringValue,
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
            title={trailLocation.title}
            description={trailLocation.description}
            latitude={trailLocation.latitude}
            longitude={trailLocation.longitude}
          />
      })
  };
  
  trailClick = (props, marker) =>
  this.setState({
    selectedTrail: props,
    activeTrail: marker,
    showInfoWindow: true
  });
  
  mapClick = () => {
  if (this.state.showInfoWindow) {
    this.setState({
      showInfoWindow: false,
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
      <Map google={this.props.google}
        center={{
          lat: 47.606209,
          lng: -122.332069
        }}
        zoom={11}
        onClick={this.mapClick}
      >
    
        {this.renderTrails()}

        <InfoWindow
          marker={this.state.activeTrail}
          visible={this.state.showInfoWindow}
          onClose={this.onInfoWindowClose}
        >
          <div id="info">
            <p>{this.state.selectedTrail.title}</p>
            <p>{this.state.selectedTrail.description}</p>
            <p>{this.state.selectedTrail.latitude}° N, {this.state.selectedTrail.longitude}° W</p>
          </div>
        </InfoWindow>
      </Map>
      </div>
    </div>
    )}
  }
  
  export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })(MapContainer)
  
