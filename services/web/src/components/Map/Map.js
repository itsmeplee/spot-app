import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { Container, Navbar, Dropdown,DropdownButton,Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import Login from '../Login/Login.js';
import AddSpot from '../Transaction/AddSpot/AddSpot';
import LocationList from '../UserInfo/Location/LocationList/LocationList';
import CarList from '../UserInfo/Car/CarList/CarList';
import ClaimSpotted from '../Transaction/ClaimSpotted/ClaimSpotted';
import ClaimReserved from '../Transaction/ClaimReserved/ClaimReserved';
import ListingStatusPane from '../Transaction/ListingStatusPane';
import { mutationUserCurrentLocation } from '../../queries/queriesUser';
import { addSpot, removeSpot, initializeMap,toggleToReserved, toggleToLooking } from '../../utilities/mapHelper';
import { AUTH_TOKEN } from '../../constants';
import { CHANGED_LISTINGS_SUBSCRIPTION } from '../../queries/queriesListing';
import { NEW_SPOTS_SUBSCRIPTION } from '../../queries/queriesSpot';
import { Subscription } from 'react-apollo';

import './Map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_APIKEY;

class Map extends Component {
  state = {
    lng: -73.9824,
    lat: 40.7426,
    zoom: 11.39,
    listSpotLng: 0,
    listSpotLat: 0,
    map: {},
    loggedIn: false,
  };

  componentDidUpdate = (prevProps) => {
    let {spotChange, listings, userInfo} = this.props;
    if (spotChange !== prevProps.spotChange) {
      if (spotChange.is_available) {
        addSpot(spotChange, this.state.map, this.claimSpot, (listings.length > 0));
      } else {
        removeSpot(spotChange, this.state.map);
      }
    }
    if (listings && listings !== prevProps.listings) {
      if (listings.length > 0 && listings[0].time_complete === null) {
        let lister = listings[0].listing_user && listings[0].listing_user.id === userInfo.id;
        toggleToReserved(this.state.map, listings[0], lister);
      } else {
        toggleToLooking(this.state.map)
      }
    }
  }

  componentDidMount() {
    this.changeLogin();
    
    const { lng, lat, zoom } = this.state;
    let map = initializeMap(lat, lng, zoom, this.mapContainer, this.moveHandler, this.clickHandler);
    
    map.on('load', () => {
      var trackUser = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      });

      setTimeout(() => {
        trackUser.trigger();
      }, 0);

      var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        country: 'us',
        bbox: [-74.2299, 40.6778, -73.6806, 40.8789]
      });
      document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
      document.getElementById('track-user').appendChild(trackUser.onAdd(map));
    });

    this.setState({
      map: map
    });

    if ("geolocation" in navigator && localStorage.getItem(AUTH_TOKEN)) {
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
      let {listings, userInfo} = this.props;
      this.displaySpots(this.props.spots);
      if (listings && listings.length > 0) {
        let lister = listings[0].listing_user && userInfo && listings[0].listing_user.id === userInfo.id;
        toggleToReserved(this.state.map, listings[0], lister);
      } else {
        toggleToLooking(this.state.map)
      }
    });
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
  };

  clickHandler = (lat, lng) => {
    this.setState({
      listSpotLat: lat,
      listSpotLng: lng
    })
    this.props.history.push({
      pathname: '/addSpot',
      state: { lng: this.state.listSpotLng, lat: this.state.listSpotLat }
    });
  };

  clickHistory = () => {
    this.props.history.push({
      pathname: '/historyPage',
      state: { rating: this.props.userInfo.rating }
    });
  }

  clickLogin = () => {
    this.props.history.push({
      pathname: '/login',
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
    if (spot.type === 1) {
      this.props.history.push({
        pathname: '/claimReserved',
        state: { 
          spot: spot
        }
      });
    } else if (spot.type === 2) {
      this.props.history.push({
        pathname: '/claimSpotted',
        state: { 
          spot: spot
        }
      });
    } else {
      console.log('Error, no spot Type');
    }
  };

  renderNavBar = () => {
    return (
      <Container className="NavContainer">
        <Navbar bg="dark">
          {/* <Navbar.Brand href="/"><img src="/favicon-256.png" width="30" height="30" alt="swapspot"/></Navbar.Brand> */}
          <Navbar.Brand href="/"><img src="/spotswap.png" width="50" height="50" alt="swapspot"/></Navbar.Brand>
          <div id="geocoder" className="form-control mr-sm-2 mb-sm-0 search"></div>
          {!this.state.loggedIn && (
            // <Button onClick={this.clickLogin} variant="outline-info">Login</Button>
            <Button id="loginBtn" onClick={this.clickLogin}>Login</Button>
          )}
          {this.state.loggedIn && (
            <DropdownButton 
              id="dropdown-basic-button" 
              title={<img src="/user-outline.svg"  width="20" height="20" alt="" />} 
              variant="outline-secondary">
              <Dropdown.Item id="dropDownItem" href="/profilePage">Profile</Dropdown.Item>
              <Dropdown.Item onClick={this.clickHistory}>Swap History</Dropdown.Item>
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
         
          <Subscription subscription={ CHANGED_LISTINGS_SUBSCRIPTION } >
            {({ data }) => {
              if (data && data.listingUpdate) {
                console.log(data)
                console.log(this.props)
                let listing = data.listingUpdate.node;
                let lister = listing.listing_user && listing.listing_user.id === this.props.userInfo.id;
                if (listing.time_complete === null) {
                  toggleToReserved(this.state.map, listing, lister);
                } else {
                  toggleToLooking(this.state.map);
                }
                return (
                  <div id="drawer">
                    <ListingStatusPane map={this.state.map} myListings={[listing]} userInfo={this.props.userInfo}/>
                  </div>
                );
              } else {
                return (
                  <div id="drawer">
                    <ListingStatusPane map={this.state.map} myListings={this.props.listings} userInfo={this.props.userInfo}/>
                  </div>
                );
              }
            }}
          </Subscription>
          <Subscription subscription={ NEW_SPOTS_SUBSCRIPTION } >
            {({ data }) => {
              if (data && data.newSpot) {
                let spotChange = data.newSpot.node;
                if (spotChange.is_available) {
                  addSpot(spotChange, this.state.map, this.claimSpot, (this.props.listings && this.props.listings.length > 0));
                } else {
                  removeSpot(spotChange, this.state.map);
                }
                return (
                  <React.Fragment></React.Fragment>
                );
              } else {
                return null; //<div>Nothing</div>
              }
            }}
          </Subscription>
          <Switch>
            <Route exact path="/login" render={() => {
              return <Login toggleLogin={this.toggleLogin} />
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