import React, { Component } from 'react';
import './Map.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { withRouter, Switch, Route } from 'react-router-dom';
import SpotsList from './SpotsList/SpotsList';
import Login from '../Login/Login.js';
import AddSpot from '../Transaction/AddSpot/AddSpot';
import LocationList from '../UserInfo/Location/LocationList/LocationList';
import CarList from '../UserInfo/Car/CarList/CarList';
import ClaimSpotted from '../Transaction/ClaimSpotted/ClaimSpotted';
import ClaimReserved from '../Transaction/ClaimReserved/ClaimReserved';
import { AUTH_TOKEN } from '../../constants';
import { initializeMap } from '../../utilities/mapHelper';
import { mutationUserCurrentLocation } from '../../queries/queriesUser';
import { graphql, compose } from 'react-apollo';
import ListingStatusPane from '../Transaction/ListingStatusPane';
import { Container, Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';

mapboxgl.accessToken = 'pk.eyJ1IjoidHJlbnRnb2luZyIsImEiOiJjam11bDQwdGwyeWZ5M3FqcGFuaHRxd3Q2In0.UyaQAvC0nx08Ih7-vq3wag';

class Map extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
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
      loggedIn: false,
      map: {}
    };
    this.claimSpot = this.claimSpot.bind(this);
    this.changeLogin = this.changeLogin.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.moveHandler = this.moveHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  };

  componentDidMount() {
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

    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.watchPosition((position) => {
        this.updateUserLocation(position);
      }, (err) => {
        console.log(err);
      })
    } else {
      /* geolocation IS NOT available */
    }
    
    this.changeLogin();
  };

  updateUserLocation(position) {
    this.props.userMutation({
      variables: {
        current_lng: (position.coords.longitude).toString(),
        current_lat: (position.coords.latitude).toString()
      },
      // refetchQueries: [{query: getSpotsQuery, variables: {}}]
    });
    
  };

  moveHandler(lng, lat, zoom) {
    this.setState({
      lng: lng,
      lat: lat,
      zoom: zoom
    });
  }

  clickHandler(lat, lng) {
    this.setState({
      listSpotLat: lat,
      listSpotLng: lng
    })
    this.props.history.push({
      pathname: '/addSpot',
      state: { lng: this.state.listSpotLng, lat: this.state.listSpotLat }
    });
  }

  changeLogin() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      this.setState({
        loggedIn: true
      })
    }
  };

  toggleLogin() {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  };

  claimSpot(spot) {
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

  render() {
    if (this.state.loggedIn) {
      return (
        <React.Fragment>
          <div id="map">
            <div ref={el => this.mapContainer = el} id="map-container" />
            <div id="track-user" className="track-user"></div> 
            <Container>
              <Navbar bg="dark" variant="dark" expand="sm">
                <Navbar.Brand>
                  <img src="/favicon-256.png" width="30" height="30" alt="swapspot"/>
                </Navbar.Brand>
                <div id="geocoder" className="geocoder"></div>
                  {/* <Nav.Link href="/profilePage">Profile</Nav.Link>
                  <Nav.Link href="/historyPage">History</Nav.Link>
                  <Nav.Link onClick={() => {
                        localStorage.removeItem(AUTH_TOKEN);
                        this.toggleLogin();
                      }}
                  >
                    Logout
                  </Nav.Link> */}
                  <DropdownButton 
                    id="dropdown-basic-button" 
                    title={<img src="/user-outline.svg"  width="20" height="20" alt="" />} 
                    variant="outline-secondary"
                  >
                    <div id="attribution">Icons made by <a href="https://www.flaticon.com/authors/spovv" title="spovv">spovv</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
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
              </Navbar>
            </Container>
            <SpotsList map={this.state.map} claimSpot={this.claimSpot}/>
            Can there be an alternate spots list for the Reserved scenario? 
            Also can we track the listings (with the subscriptions) in a better way?  Why do we need one array for all.
                       we can remove from the array if there is something that is 'closed' and then acted upon?
                          will it stop getting subscriptions? Hopefully
                      upon new create, we can add to the array and then track. We already know this will recieve subscriptions.
          </div>
          <div id="drawer">
            <ListingStatusPane />
          </div>
          <Switch>
            <Route exact path="/addSpot" component={AddSpot} />
            <Route exact path="/login" render={() => {
              return <Login toggleLogin={this.toggleLogin}/>
            }}/>
            <Route exact path="/spots" component={SpotsList} />
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
          <div ref={el => this.mapContainer = el} id="map-container" />
          <div id="track-user" className="track-user"></div>
          <Container>
            <Navbar bg="dark" variant="dark" expand="sm">
              <Navbar.Brand><img src="/favicon-256.png" width="30" height="30" alt=""/></Navbar.Brand>
              <div id="geocoder" className="geocoder"></div>
              <Nav.Link href="/login">Login</Nav.Link>
            </Navbar>
          </Container>
          <SpotsList map={this.state.map} claimSpot={this.claimSpot}/>
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
