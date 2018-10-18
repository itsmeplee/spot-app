import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { getListingsQuery, CHANGED_LISTINGS_SUBSCRIPTION } from '../../queries/queriesListing';
import { Query } from 'react-apollo';
// import { reduceStore } from 'apollo-live-client';
import Loader from '../App/Loader';
import Reserving from './HandshakeModals/Reserving';
import Claimed from './HandshakeModals/Claimed';
import Success from './HandshakeModals/Success';
import Failed from './HandshakeModals/Failed';
import Expired from './HandshakeModals/Expired';
import './HandshakeLister.css';

class HandshakeLister extends Component {

  state = {
    modalShow: true,
    homeRedirect: false
  };

  handleClose = () => {
    this.setState({
      modalShow: false
    })
  }

  openModal = () => {
    this.setState({
      modalShow: true
    })
  }

  _subscribeToUpdatedListings = subscribeToMore => {
    subscribeToMore({
      document: CHANGED_LISTINGS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        this.openModal();
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

  displayListingStatus = (listing) => {
    console.log(listing.spot.is_available)
    if (listing.status === 1 && listing.spot.is_available) {
      return <Reserving listing={listing} handleClose={this.handleClose} key={listing.id}/>
    } else if (listing.status === 1 && !listing.spot.is_available) {
      return <Expired listing={listing} handleClose={this.handleClose} key={listing.id}/>
    } else if (listing.status === 2) {
      return <Claimed listing={listing} handleClose={this.handleClose} key={listing.id}/>
    } else if (listing.status === 8) {
      return <Success listing={listing} handleClose={this.handleClose} key={listing.id}/>;
    } else if (listing.status > 3) {
      return <Failed listing={listing} handleClose={this.handleClose} key={listing.id}/>;
    } else {
      if (this.state.modalShow) {
        this.handleClose();
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Query query={getListingsQuery} >
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <Loader></Loader>;
            if (error) return <div>Error</div>;
            this._subscribeToUpdatedListings(subscribeToMore);
            
            return (
              <div className="modal-container">
                <Modal show={data.myListings.length > 0 && this.state.modalShow} onHide={this.handleClose}>
                  <Modal.Header>
                    <Modal.Title>Current Swaps</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div id="modal-content">
                      {
                        (data.myListings[0]) && this.displayListingStatus(data.myListings[0])
                      }
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            );
          }}
        </Query>
      </React.Fragment>
    );
  };
};

export default HandshakeLister;
