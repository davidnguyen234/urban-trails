// import './App.css';
import { Component } from "react";
import {Map, GoogleApiWrapper} from "google-maps-react";

class MapContainer extends Component {
  render() {
    return(
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
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ""
})(MapContainer)
