import React from 'react';
import { Button } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import { updateListingMutation } from '../../../queries/queriesListing';
import moment from 'moment';

var Failed = function({listing, handleClose, userInfo}) {
  let claimer = (listing.claiming_user.id === this.props.userInfo.id);
  return (
    <React.Fragment>
      <div key={listing.id}>
        <h3>Oops!</h3>
        {listing.status === 4 && !claimer && <p>Oops, your spot closed because you weren't there!</p>}
        {listing.status === 5 && claimer && <p>Oops, your spot closed because you weren't there!</p>}
        {listing.status === 6 && !claimer && <p>Sorry, the spot swap was cancelled by the other user!</p>}
        {listing.status === 7 && claimer && <p>Sorry, the spot swap was cancelled by the other user!</p>}
        <Mutation
          mutation={updateListingMutation}
          variables={{
            spot_id: listing.spot.id,
            id: listing.id,
            time_complete: moment().format()
          }}
        >
          {editListing => <Button id="noticeBtn" onClick={() => {
            editListing();
            handleClose();
          }}>Closed</Button>}
        </Mutation>
      </div>
    </React.Fragment>
  )
}

export default Failed;


