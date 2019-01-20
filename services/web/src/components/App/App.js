import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Switch, Route } from 'react-router-dom';
import MapComp from '../Map/Map';
import ProfilePage from '../UserInfo/Profile/ProfilePage';
import HistoryPage from '../UserInfo/History/HistoryPage';
import AddCar from '../UserInfo/Car/AddCar/AddCar';
import AddLocation from '../UserInfo/Location/AddLocation/AddLocation';
import Loader from './Loader';
import { getListingsQuery } from '../../queries/queriesListing';
import { getSpotsQuery } from '../../queries/queriesSpot';
import { getUserQuery } from '../../queries/queriesUser';
import { AUTH_TOKEN } from '../../constants';

import './App.css';

class App extends Component {

  state = {
    spotChange: {},
    subbedListings: []
  }

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
              {({ loading: loadingUser, data: dataForUser, error: userError }) => (
                <Query query={getListingsQuery}>
                  {({ loading: loadingListings, data: dataForListings, error: listingsError}) => (
                    <Query query={getSpotsQuery}>
                      {({ loading: loadingSpots, data: dataForSpots, error: spotsError }) => {
                        if (userError || listingsError || spotsError) return (<span>Error in loading, please try again later</span>);
                        if (loadingUser || loadingListings || loadingSpots ) return (<Loader></Loader>);
                        console.log(dataForListings)
                        console.log(dataForSpots)
                        console.log(dataForUser)
                        return (
                          <div className="App">
                            <MapComp listings={dataForListings.myListings} spots={dataForSpots.openSpot} userInfo={dataForUser.userInfo}/>
                          </div>
                        );
                      }}
                    </Query>
                  )}
                </Query>
              )}
            </Query>
          </Switch>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Query query={getSpotsQuery}>
            {({ loading: loadingSpots, data: { openSpot }, error: spotsError }) => {
              if ( spotsError) return (<span>Error in loading, please try again later</span>);
              if ( loadingSpots ) return (<Loader></Loader>);
              return (
                <div className="App">
                  <MapComp listings={[]} spots={openSpot} userInfo={{}}/>
                </div>
              );
            }}
          </Query>
        </React.Fragment>
      );
    }};
};

export default App;
