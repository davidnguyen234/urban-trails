import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from "google-maps-react";
import Navigation from './Navigation';
import '../App.css';

class MapContainer extends Component {
  render() {
    return(
      <div>
        <div>
        <Navigation />
        </div>
        <div className="content">
            <Map
              google = {this.props.google}
              style = {{width: "100%", height: "100%"}}
              zoom = {10}
              initialCenter = {
                {
                lat: 47.6062,
                lng: -122.3321
                }
              }
            />
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer)
