import React, { Component } from 'react';
import { getListingsQuery, CHANGED_LISTINGS_SUBSCRIPTION } from '../../queries/queriesListing';
import { Query } from 'react-apollo';
// import { reduceStore } from 'apollo-live-client';
import Reserving from './HandshakeModals/Reserving';
import Claimed from './HandshakeModals/Claimed';
import Success from './HandshakeModals/Success';
import Failed from './HandshakeModals/Failed';
import { AUTH_TOKEN } from '../../constants';
import Expired from './HandshakeModals/Expired';
import './HandshakeLister.css';

class ListingStatusDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerShow: true,
      homeRedirect: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.handleCloseAndRemove = this.handleCloseAndRemove.bind(this);
  };

  handleClose() {
    this.setState({
      drawerShow: false
    })
  }

  handleCloseAndRemove() {

    this.setState({
      drawerShow: false
    })
  }

  openDrawer() {
    this.setState({
      drawerShow: true
    })
  }

  _subscribeToUpdatedListings = subscribeToMore => {
    subscribeToMore({
      document: CHANGED_LISTINGS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        console.log(subscriptionData.data.listingUpdate.node)
        this.openDrawer();
        const listingUpdate = subscriptionData.data.listingUpdate.node;
        let newArray = [listingUpdate, ...prev.myListings];
        newArray = this._removeDups(newArray);
        var toReturn = Object.assign({}, prev, {
          myListings: newArray,
        })
        return toReturn;
      }
    })
  }

  _removeDups = data => {
    let obj = {};
    data.forEach((item) => {
      obj[item.id] = item;
    })
    let newArray = [];
    for (let keys in obj) {
      newArray.push(obj[keys]);
    }
    return newArray;
  }

  displayListingStatus(listing) {
    if (listing.status === 1 && listing.spot.is_available) {
      return <Reserving listing={listing} handleClose={this.handleClose} key={listing.id}/>
    } else if (listing.status === 1 && !listing.spot.is_available) {
      return <Expired listing={listing} handleClose={this.handleClose}  key={listing.id}/>
    } else if (listing.status === 2) {
      return <Claimed listing={listing} handleClose={this.handleClose}  key={listing.id}/>
    } else if (listing.status === 8) {
      return <Success listing={listing} handleCloseAndRemove={this.handleCloseAndRemove}  key={listing.id}/>;
    } else if (listing.status > 3) {
      return <Failed listing={listing} handleClose={this.handleClose}  key={listing.id}/>;
    } else {
      if (this.state.Show) {
        this.handleClose();
      }
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
              <Query query={getListingsQuery} >
              {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <div>Fetching</div>;
                if (error) return <div>Error</div>;
                this._subscribeToUpdatedListings(subscribeToMore);
                console.log(data);
                if (data.myListings && data.myListings.length > 0) {
                  return (
                    <div id="drawer-content">
                      {
                        (data.myListings[0]) && this.displayListingStatus(data.myListings[data.myListings.length - 1])
                      }
                    </div>
                  );
                } else {
                  return (
                    <div>
                      You have no swaps in progress.
                    </div>
                  )
                }
              }}
              </Query>
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
    
  }
};

export default ListingStatusDrawer;
