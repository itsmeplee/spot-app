import React from 'react';
import { Mutation } from 'react-apollo';
import { Button, Card } from 'react-bootstrap';
import { updateListingMutation } from '../../../queries/queriesListing';
import moment from 'moment';

var Expired = function({listing, handleClose}) {
  return (
    <React.Fragment>
      <div key={listing.id}>
        <Card>
          <div>Thanks for listing a spot by</div>
          <div>{listing.spot.street1}, {listing.spot.street2}, {listing.spot.city}</div>
          <div>However, your listing has expired.</div>
          <div>
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
              {editListing => <Button id="noticeBtn" onClick={() => {
                editListing();
                handleClose();
              }}>Close</Button>}
            </Mutation>
          </div>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default Expired;


