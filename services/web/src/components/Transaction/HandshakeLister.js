import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getListingsQuery, editListingMutation } from '../../queries/queriesListing';
import { Query, Mutation } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';

const CHANGED_LISTINGS_SUBSCRIPTION = gql`
  subscription {
    listingUpdate {
      node {
        id
        status
        spot{
          id
          end_time
        }
        claiming_user {
          user_name
          id
          default_car{
            model
            color
          }
        }
      }
    }
  }
`;

class HandshakeLister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: true,
      homeRedirect: false
    };
    this.handleClose = this.handleClose.bind(this);
  };

  _subscribeToUpdatedListings = subscribeToMore => {
    subscribeToMore({
      document: CHANGED_LISTINGS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const updatedListing = subscriptionData.data.listingUpdate.node;
        // var listings = [updatedListing, ...prev.myListings];

        // var newListingsObj = {
        //   listings: listings,
        //   __typename: "myListings"
        // };
        // this.addSpot(listings);
      }
    })
  }

  handleClose() {
    this.setState({
      modalShow: false
    })
  }

  displayListingStatus(listing) {
    if (listing.status === 1) {
      return (
        <div key={listing.id}>
          <p>Hello, you are reserving spot #{listing.spot.id}</p>
          <p>You are holding me for the next {(moment(listing.spot.end_time).fromNow())}.</p>
          <Mutation
            mutation={editListingMutation}
            variables={{
              spot_id: listing.spot.id,
              listing_id: listing.id,
              status: 6
            }}
            onCompleted={() => this.props.history.push('/')}
          >
            {editListing => <button onClick={() => {
              editListing();
              this.handleClose();
            }}>Cancel</button>}
          </Mutation>
        </div>
      )
    } else if (listing.status === 2) {
      return (
        <React.Fragment>
          CLAIMED
          {JSON.stringify(listing)}
        </React.Fragment>
      );
    } else if (listing.status === 3) {
      return (
        <React.Fragment>
          YOUR RESERVATION TIMED OUT
          {JSON.stringify(listing)}
        </React.Fragment>
      );
    } else if (listing.status === 4) {
      return (
        <React.Fragment>
          THE CLAIMER OF THIS SPOT SAYS YOU WEREN'T THERE
          {JSON.stringify(listing)}
        </React.Fragment>
      );
    } else if (listing.status === 7) {
      return (
        <React.Fragment>
          THE CLAIMER OF THIS SPOT CANCELLED!
          {JSON.stringify(listing)}
        </React.Fragment>
      );
    } else if (listing.status === 8) {
      return (
        <React.Fragment>
          SPOT SWAPPED!
          {JSON.stringify(listing)}
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <React.Fragment>

        <div className="modal-container">
          <Modal show={this.state.modalShow} onHide={this.handleClose}>
            <Modal.Header>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <Query query={getListingsQuery} >
                  
                  {({ loading, error, data, subscribeToMore }) => {
                    if (loading) return <div>Fetching</div>;
                    if (error) return <div>Error</div>;
                    this._subscribeToUpdatedListings(subscribeToMore);
                    return data.myListings.map((listing) => {
                      return this.displayListingStatus(listing);
                    })
                  }}
                </Query>
              </div>
            </Modal.Body>
            <Modal.Footer>
               {/* 
                <Mutation
                  mutation={editListingMutation}
                  variables={{
                    spot_id: spot_id,
                    listing_id: listing_id, 
                    status: 2
                  }}
                  onCompleted={() => this.props.history.push('/')}
                >
                  {editSpotListing => <button onClick={() => {
                    editSpotListing();
                    this.changeState();
                  }}>Extend time</button>}
                </Mutation> */}
            </Modal.Footer>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
};

export default HandshakeLister;