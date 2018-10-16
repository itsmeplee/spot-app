import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { Button } from 'react-bootstrap';
import { editListingMutation } from '../../../queries/queriesListing';
import { editUserBalance } from '../../../queries/queriesUser';
import moment from 'moment';

class Claimed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.hashCode = this.hashCode.bind(this);
    this.intToRGB = this.intToRGB.bind(this);
    this.editTwoFunctions = this.editTwoFunctions.bind(this);
  };

  hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  intToRGB(i) {
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
  
    return "00000".substring(0, 6 - c.length) + c;
  };

  editTwoFunctions(editListing, editBalance) {
    editListing({
      variables: {
        spot_id: this.props.listing.spot.id,
        listing_id: this.props.listing.id,
        status: 8
      }
    })
    .then(() => {
      editBalance({
        variables: {
          value: this.props.listing.value,
          listerId: this.props.listing.listing_user.id
        }
      })
    })
  };


  render() {
    const { listing, handleClose } = this.props
    var overtime;

    if (moment(listing.spot.end_time).isBefore(Date.now())) {
      overtime = (
        <Mutation
          mutation={editListingMutation}
          variables={{
            spot_id: listing.spot.id,
            listing_id: listing.id,
            status: 5
          }}
          onCompleted={() => this.props.history.push('/')}
        >
          {editListing => <Button variant="link" onClick={() => {
            editListing();
            handleClose();
          }}>User Never Appeared</Button>}
        </Mutation>
      )
    };
    
    return (
      <div key={listing.id} style={{backgroundColor: '#' + this.intToRGB(this.hashCode(listing.spot.id)), height: '70vh'}}>
        <h3>CLAIMED!</h3>
        <p><b>{listing.claiming_user && listing.claiming_user.user_name}</b> has claimed the spot!</p>
        <p>{listing.spot.street1}, {listing.spot.street2} {listing.spot.city}</p>
        {(listing.claiming_user && listing.claiming_user.user_cars[0])  && <p> Driving a {listing.claiming_user.user_cars[0].color} {listing.claiming_user.user_cars[0].make} {listing.claiming_user.user_cars[0].model}</p>}
        {(listing.claiming_user && listing.claiming_user.user_cars[0])  && <p> Plate: {listing.claiming_user.user_cars[0].plate}</p>}
        <img src="/sort.svg" width="60" height="60" alt="" />
        <p>To swap spots with <b>{listing.listing_user.user_name}</b></p>
        {(listing.listing_user.user_cars[0])  && <p> Driving a {listing.listing_user.user_cars[0].color} {listing.listing_user.user_cars[0].make} {listing.listing_user.user_cars[0].model}</p>}
        {(listing.listing_user.user_cars[0])  && <p> Plate: {listing.listing_user.user_cars[0].plate}</p>}
        <p> Show your screen and match colors with the other driver </p>
        <Mutation
          mutation={editListingMutation}
          // onCompleted={() => this.props.history.push('/')}
        >
          {editListing => (
            <Mutation mutation={editUserBalance}>
            {(editBalance) => <Button onClick={() => {this.editTwoFunctions(editListing, editBalance)}}>Confirm Successful Swap</Button>}
            </Mutation>
          )}
        </Mutation>
        <br/>
        <Mutation
          mutation={editListingMutation}
          variables={{
            spot_id: listing.spot.id,
            listing_id: listing.id,
            status: 6
          }}
          onCompleted={() => this.props.history.push('/')}
        >
          {editListing => <Button variant="link" onClick={() => {
            editListing();
            handleClose();
          }}>Cancel Swap</Button>}
        </Mutation>
        {overtime}
      </div>
    );
  }
};

export default Claimed;