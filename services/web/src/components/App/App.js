import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Switch, Route } from 'react-router-dom';
import MapComp from '../Map/Map';
import ProfilePage from '../UserInfo/Profile/ProfilePage';
import HistoryPage from '../UserInfo/History/HistoryPage';
import AddCar from '../UserInfo/Car/AddCar/AddCar';
import AddLocation from '../UserInfo/Location/AddLocation/AddLocation';
import Loader from './Loader';
import { getListingsQuery, CHANGED_LISTINGS_SUBSCRIPTION } from '../../queries/queriesListing';
import { getSpotsQuery, NEW_SPOTS_SUBSCRIPTION } from '../../queries/queriesSpot';
import { getUserQuery } from '../../queries/queriesUser';
import { AUTH_TOKEN } from '../../constants';

import './App.css';

class App extends Component {

  state = {
    spotChange: {}
  }

  _subscribeToNewSpots = subscribeToMore => {
    subscribeToMore({
      document: NEW_SPOTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newSpot = subscriptionData.data.newSpot.node;
        this.setState({
          spotChange: newSpot
        });
      }
    })
  };
  
  _subscribeToUpdatedListings = subscribeToMore => {
    subscribeToMore({
      document: CHANGED_LISTINGS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const listingUpdate = subscriptionData.data.listingUpdate.node;
        let newArray = [listingUpdate, ...prev.myListings];
        newArray = this._removeDups(newArray);
        var toReturn = Object.assign({}, prev, {
          myListings: newArray,
        })
        return toReturn;
      }
    })
  };

  _removeDups = data => {
    let obj = {};
    data.forEach((item) => {
      obj[item.id] = item;
    })
    let newArray = [];
    for (let keys in obj) {
      if (obj[keys].time_complete === null){
        newArray.push(obj[keys]);
      }
    }
    return newArray;
  };;

  renderMap = (listings, userInfo) => {
    let maplistings = listings || [];
    return (
      <Query query={getSpotsQuery}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <Loader></Loader>;
          if (error) {
            console.log(error)
            return <div>Error</div>;
          }
          this._subscribeToNewSpots(subscribeToMore);
          return (
            <div className="App">
              <MapComp listings={maplistings} spots={data.openSpot} spotChange={this.state.spotChange} userInfo={userInfo}/>
            </div>
          );
        }}
      </Query>
    );
  };

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    
    if (authToken) {
      return (
        <React.Fragment>
          <Switch>
            <Route exact path="/profilePage" component={ProfilePage} />
            <Route exact path="/historyPage" component={HistoryPage} />
            <Route exact path="/addCar" component={AddCar} />
            <Route exact path="/addLocation" component={AddLocation} />
            <Query query={getUserQuery}>
              {({ loading, error, data }) => {
                if (loading) return <Loader></Loader>;
                if (error) {
                  console.log(error)
                  return <div>Error</div>;
                }
                let userInfo = data.userInfo
                return (
                  <Query query={getListingsQuery} >
                    {({ loading, error, data, subscribeToMore }) => {
                      if (loading) return <Loader></Loader>;
                      if (error) {
                        console.log(error)
                        return <div>Error</div>;
                      }
                      
                      this._subscribeToUpdatedListings(subscribeToMore);
                      let listings = data.myListings
                      return (
                        this.renderMap(listings, userInfo)
                      );
                    }}
                  </Query>
                );
              }}
            </Query>
          </Switch>
        </React.Fragment>
      );
    } else {
      return (
        this.renderMap()
      );
    };
  };

};

export default App;
