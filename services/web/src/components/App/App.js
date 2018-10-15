import React, { Component } from 'react';
import './App.css';
import MapComp from '../Map/Map';
import HandshakeLister from '../Transaction/HandshakeLister';
import { AUTH_TOKEN } from '../../constants';
import { withRouter, Switch, Route } from 'react-router-dom';
import ProfilePage from '../UserInfo/Profile/ProfilePage';
import HistoryPage from '../UserInfo/History/HistoryPage';
import AddCar from '../UserInfo/Car/AddCar/AddCar';
import AddLocation from '../UserInfo/Location/AddLocation/AddLocation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  handshake() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if(authToken){
      return (
        <HandshakeLister />
      );
    } else {
      return (
        <React.Fragment></React.Fragment>
      )
    }
  };

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/profilePage" component={ProfilePage} />
          <Route exact path="/historyPage" component={HistoryPage} />
          <Route exact path="/addCar" component={AddCar} />
          <Route exact path="/addLocation" component={AddLocation} />
          <div className="App">
            <MapComp />
            <br></br><br></br>
            {/* {this.handshake()} */}
          </div>
        </Switch>
      </React.Fragment>
    );
  };
};

export default App;
