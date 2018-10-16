import React from 'react';
import { Mutation } from 'react-apollo';
import { editListingMutation } from '../../../queries/queriesListing';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import './HandshakeModals.css';

var Reserving = function({listing, handleClose}) {
  return (
    <React.Fragment>
      <div key={listing.id}>
        <p>You are holding a spot to be swapped near </p>
        <p><b>{listing.spot.street1}, {listing.spot.street2} {listing.spot.city}</b></p>
        <p>Your listing of this spot will expire</p>
        <h4><b>{(moment(listing.spot.end_time).fromNow())}</b></h4>
        <Mutation
          mutation={editListingMutation}
          variables={{
            spot_id: listing.spot.id,
            listing_id: listing.id,
            status: 6
          }}
          onCompleted={() => this.props.history.push('/')}
        >
          {editListing => <Button variant="danger" onClick={() => {
            editListing();
            handleClose();
          }}>Cancel this listing</Button>}
        </Mutation>
        <br/>
      </div>
    </React.Fragment>
  )
}

export default Reserving;


