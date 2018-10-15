import React from 'react';
import { Mutation } from 'react-apollo';
import { editListingMutation } from '../../../queries/queriesListing';

var Expired = function({listing, handleClose}) {
  return (
    <React.Fragment>
      <div key={listing.id}>
        <p>Thanks for listing a spot by</p>
        <p>{listing.spot.street1}, {listing.spot.street2} {listing.spot.city}</p>
        <p>However, your listing has expired.</p>
        <Mutation
          mutation={editListingMutation}
          variables={{
            spot_id: listing.spot.id,
            listing_id: listing.id,
            status: 3
          }}
          onCompleted={() => this.props.history.push('/')}
        >
          {editListing => <button onClick={() => {
            editListing();
            handleClose();
          }}>Close</button>}
        </Mutation>
      </div>
    </React.Fragment>
  )
}

export default Expired;


