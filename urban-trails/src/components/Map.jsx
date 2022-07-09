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
      fetch("https://firestore.googleapis.com/v1beta1/projects/urban-trails-3a784/databases/(default)/documents/trails")
      .then(response => response.json())
      .then(data => this.setState({ trailLocations: data}))
  };
  
  renderTrails() {
    console.log(this.state.trailLocations)
    return this.state.trailLocations.map((trails, i) => { 
      return <Marker
            key={i}
            onClick={this.trailClick}
            id={trails.id}
            position={{
              lat: trails.latitude,
              lng: trails.longitude
            }}
            title={trails.title}
            description={trails.description}
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
            <h3> Trail {this.state.selectedTrail.id}</h3> <br></br>
            <p>{this.state.selectedTrail.title}</p>
            <p>{this.state.selectedTrail.description}</p>
    <br></br>
          </div>
        </InfoWindow>
      </Map>
      </div>
    </div>
  );
  }
  }
  
  export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })(MapContainer)
  
