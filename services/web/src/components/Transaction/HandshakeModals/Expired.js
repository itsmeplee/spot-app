import React from 'react';
import { Mutation } from 'react-apollo';
import { Button } from 'react-bootstrap';
// import { editListingMutation } from '../../../queries/queriesListing';
import { updateListingMutation } from '../../../queries/queriesListing';
import moment from 'moment';

var Expired = function({listing, handleClose}) {
  return (
    <React.Fragment>
      <div key={listing.id}>
        <p>Thanks for listing a spot by</p>
        <p>{listing.spot.street1}, {listing.spot.street2} {listing.spot.city}</p>
        <p>However, your listing has expired.</p>
        <Mutation
          mutation={updateListingMutation}
          variables={{
            spot_id: listing.spot.id,
            id: listing.id,
            status: 3,
            time_complete: moment().format()
          }}
          onCompleted={() => this.props.history.push('/')}
        >
          {editListing => <Button onClick={() => {
            editListing();
            handleClose();
          }}>Close</Button>}
        </Mutation>
      </div>
    </React.Fragment>
  )
}

export default Expired;


