import React, { Component } from 'react';
// import { reduceStore } from 'apollo-live-client';
import Reserving from './HandshakeModals/Reserving';
import Claimed from './HandshakeModals/Claimed';
import Success from './HandshakeModals/Success';
import Failed from './HandshakeModals/Failed';
import { AUTH_TOKEN } from '../../constants';
import Expired from './HandshakeModals/Expired';
import './HandshakeLister.css';

class ListingStatusDrawer extends Component {

  state = {
    drawerShow: true
  };

  handleClose = () => {
    this.setState({
      drawerShow: false
    })
  };

  openDrawer = () => {
    this.setState({
      drawerShow: true
    })
  }
  componentDidMount = () => {
    this.openDrawer();
  }

  displayListingStatus = (listing) => {
    if (listing.status === 1 && listing.spot.is_available) {
      return <Reserving listing={listing} handleClose={this.handleClose} key={listing.id}/>
    } else if (listing.status === 1 && !listing.spot.is_available) {
      return <Expired listing={listing} handleClose={this.handleClose}  key={listing.id}/>
    } else if (listing.status === 2) {
      return <Claimed listing={listing} handleClose={this.handleClose}  key={listing.id} userInfo={this.props.userInfo}/>
    } else if (listing.status === 8) {
      return <Success listing={listing} handleClose={this.handleClose}  key={listing.id}/>;
    } else if (listing.status > 3) {
      return <Failed listing={listing} handleClose={this.handleClose}  key={listing.id} userInfo={this.props.userInfo}/>;
    } else {
      if (this.state.Show) {
        this.handleClose();
      }
    }
  };

  displayIt = () => {
    if (this.props.myListings && this.props.myListings.length > 0) {
      return (
        <div id="drawer-content">
          {
            (this.props.myListings[0]) && this.displayListingStatus(this.props.myListings[0])
          }
        </div>
      );
    } else {
      return (
        <div id="drawer-content">
          You have no swaps in progress.
        </div>
      )
    }
  }

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      if (this.state.drawerShow) {
        return (
          <React.Fragment>
            <div id="status-tracker-open" className="status-tracker-open">
              <div onClick={this.handleClose}>
                <img src="/down.png" width="80" height="30" alt="" />
              </div>

              {this.displayIt()}

            </div>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <div id="status-tracker-closed" className="status-tracker-closed">
              <div onClick={this.openDrawer}>
                <img src="/up.png" width="80" height="30" alt="" />
              </div>
            </div>
          </React.Fragment>
        );
      }
    } else {
      return (
        <React.Fragment></React.Fragment>
      )
    }
  };
};

export default ListingStatusDrawer;
