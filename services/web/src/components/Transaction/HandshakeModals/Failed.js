import React from 'react';
import { Button } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import { updateListingMutation } from '../../../queries/queriesListing';
import moment from 'moment';

var Failed = function({listing, handleClose}) {
  return (
    <React.Fragment>
      <div key={listing.id}>
        <h3>Oops!</h3>
        {listing.status === 4 && <p>Oops, your spot closed because you weren't there!</p>}
        {listing.status === 5 && <p>Oops, your spot closed because you weren't there!</p>}
        {listing.status === 6 && <p>Sorry, the spot swap was cancelled by the other user!</p>}
        {listing.status === 7 && <p>Sorry, the spot swap was cancelled by the other user!</p>}
        <Mutation
          mutation={updateListingMutation}
          variables={{
            spot_id: listing.spot.id,
            id: listing.id,
            time_complete: moment().format()
          }}
        >
          {editListing => <Button onClick={() => {
            editListing();
            handleClose();
          }}>Close</Button>}
        </Mutation>
        
        {/* <Button onClick={() => {
            handleClose();
          }}
        >
          Close
        </Button> */}
      </div>
    </React.Fragment>
  )
}

export default Failed;


