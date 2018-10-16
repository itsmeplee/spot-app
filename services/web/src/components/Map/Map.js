import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { Container, Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import SpotsList from './SpotsList/SpotsList';
import Login from '../Login/Login.js';
import AddSpot from '../Transaction/AddSpot/AddSpot';
import LocationList from '../UserInfo/Location/LocationList/LocationList';
import CarList from '../UserInfo/Car/CarList/CarList';
import ClaimSpotted from '../Transaction/ClaimSpotted/ClaimSpotted';
import ClaimReserved from '../Transaction/ClaimReserved/ClaimReserved';
import ListingStatusPane from '../Transaction/ListingStatusPane';
import { mutationUserCurrentLocation } from '../../queries/queriesUser';
import { addSpot, removeSpot, initializeMap,toggleToReserved, toggleToLooking } from '../../utilities/mapHelper';
import { AUTH_TOKEN, mapboxgl_accessToken } from '../../constants';

import './Map.css';

mapboxgl.accessToken = mapboxgl_accessToken;

class Map extends Component {
  state = {
    lng: -73.9824,
    lat: 40.7426,
    zoom: 11.39,
    listRedirect: false,
    listSpotLng: 0,
    listSpotLat: 0,
    modalShow: true,
    spotType: 0,
    spotValue: null,
    spotId: '',
    listingId: '',
    spotStartTime: '',
    spotEndTime: '',
    map: {},
    loggedIn: false,
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.spotChange !== prevProps.spotChange) {
      if (this.props.spotChange.is_available) {
        addSpot(this.props.spotChange, this.state.map, this.claimSpot);
      } else {
        removeSpot(this.props.spotChange, this.state.map);
      }
    }
    if (this.props.listings && this.props.listings !== prevProps.listings) {
      if (this.props.listings.length > 0) {
        toggleToReserved(this.state.map, this.props.listings[0]);
      } else {
        toggleToLooking(this.state.map)
      }
    }
  }

  componentDidMount() {
    this.changeLogin();
    
    const { lng, lat, zoom } = this.state;
    let map = initializeMap(lat, lng, zoom, this.mapContainer, this.moveHandler, this.clickHandler);
    
    var trackUser = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });

    map.on('load', () => {
      trackUser.trigger();
    });
    document.getElementById('track-user').appendChild(trackUser.onAdd(map));

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      country: 'us',
      bbox: [-74.2299, 40.6778, -73.6806, 40.8789]
    });
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

    this.setState({
      map: map
    });

    if ("geolocation" in navigator && this.state.loggedIn) {
      /* geolocation is available */
      navigator.geolocation.watchPosition((position) => {
        this.updateUserLocation(position);
      }, (err) => {
        console.log(err);
      })
    } else {
      /* geolocation IS NOT available */
    }

    map.on('load', () => {
      this.displaySpots(this.props.spots);
      if (this.props.listings.length > 0) {
        toggleToReserved(this.state.map, this.props.listings[0]);
      } else {
        toggleToLooking(this.state.map)
      }
    })
  };

  displaySpots = (openSpotList) => {
    openSpotList.forEach((spot) => {
      addSpot(spot, this.state.map, this.claimSpot);
    });
  };

  updateUserLocation = (position) => {
    this.props.userMutation({
      variables: {
        current_lng: (position.coords.longitude).toString(),
        current_lat: (position.coords.latitude).toString()
      },
    });
    
  };

  moveHandler = (lng, lat, zoom) => {
    this.setState({
      lng: lng,
      lat: lat,
      zoom: zoom
    });
  }

  clickHandler = (lat, lng) => {
    this.setState({
      listSpotLat: lat,
      listSpotLng: lng
    })
    this.props.history.push({
      pathname: '/addSpot',
      state: { lng: this.state.listSpotLng, lat: this.state.listSpotLat }
    });
  }

  toggleLogin = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  };

  changeLogin = () => {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      this.setState({
        loggedIn: true
      })
    }
  };

  claimSpot = (spot) => {
    if(!this.state.loggedIn) {
      toast.error("Please Login to claim spots.", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    }
    this.setState({
      listingId: spot.listing.id,
      spotValue: spot.listing.value,
      spotType: spot.type,
      spotId: spot.id,
      spotStartTime: spot.start_time,
      spotEndTime: spot.end_time
    });

    if (spot.type === 1) {
      this.props.history.push({
        pathname: '/claimReserved',
        state: { 
          spotId: this.state.spotId, 
          listingId: this.state.listingId, 
          start_time: this.state.spotStartTime, 
          end_time: this.state.spotEndTime,
          value: this.state.spotValue
        }
      });
    } else if (spot.type === 2) {
      this.props.history.push({
        pathname: '/claimSpotted',
        state: { 
          spotId: this.state.spotId, 
          listingId: this.state.listingId, 
          start_time: this.state.spotStartTime
        }
      });
    } else {
      console.log('Error, no spot Type');
    }
  };

  renderNavBar = () => {
    return (
      <Container>
        <Navbar bg="dark" variant="dark" expand="sm">
          <Navbar.Brand>
            <img src="/favicon-256.png" width="30" height="30" alt="swapspot"/>
          </Navbar.Brand>
          <div id="geocoder" className="geocoder"></div>
          {!this.state.loggedIn && (
            <Nav.Link href="/login">Login</Nav.Link>
          )}
          {this.state.loggedIn && (
            <DropdownButton 
              id="dropdown-basic-button" 
              title={<img src="/user-outline.svg"  width="20" height="20" alt="" />} 
              variant="outline-secondary"
            >
              <Dropdown.Item href="/profilePage">Profile</Dropdown.Item>
              <Dropdown.Item href="/historyPage">Swap History</Dropdown.Item>
              <Dropdown.Item onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN);
                  this.toggleLogin();
                }}
              >
                Logout
              </Dropdown.Item>
            </DropdownButton>
          )}            
        </Navbar>
      </Container>
    );
  };

  renderMap = () => {
    return (
      <React.Fragment>
        <div ref={el => this.mapContainer = el} id="map-container" />
        <div id="track-user" className="track-user"></div> 
      </React.Fragment>
    );
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <React.Fragment>
          <div id="map">
            {this.renderMap()}
            {this.renderNavBar()}
          </div>
          <div id="drawer">
            <ListingStatusPane map={this.state.map} myListings={this.props.listings}/>
          </div>
          <Switch>
            <Route exact path="/login" render={() => {
              return <Login toggleLogin={this.toggleLogin}/>
            }}/>
            <Route exact path="/addSpot" component={AddSpot} />
            <Route exact path="/locations" component={LocationList} />
            <Route exact path="/cars" component={CarList} />
            <Route exact path="/claimSpotted" component={ClaimSpotted} />
            <Route exact path="/claimReserved" component={ClaimReserved} />
          </Switch>
      </React.Fragment>
      )
    }
    else {
      return (
      <React.Fragment>
        <div id="map">
          {this.renderMap()}
          {this.renderNavBar()}
          <ToastContainer />
        </div>
        <Switch>
          <Route exact path="/login" render={() => {
            return <Login toggleLogin={this.toggleLogin}/>
          }}/>
        </Switch>
        </React.Fragment>
      )
    }
  };
};

export default withRouter(compose(
  graphql(mutationUserCurrentLocation, {name: "userMutation"})
)(Map));
