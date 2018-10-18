import React from 'react';
import { Mutation } from 'react-apollo';
import { editListingMutation } from '../../../queries/queriesListing';
import moment from 'moment';
import { Button, Container, Card } from 'react-bootstrap';
import './HandshakeModals.css';

var Reserving = function({listing, handleClose}) {
  return (
    <React.Fragment>
      <div className="drawerReserved">
        <Card className="reservingCard" key={listing.id}>
          <Card.Body>
            <div>You are holding a spot to be swapped near </div>
            <div><b>{listing.spot.street1}, {listing.spot.street2}, {listing.spot.city}</b></div>
            <div>Your listing of this spot will expire</div>
            <h5><b>{(moment(listing.spot.end_time).fromNow())}</b></h5>
            <div>
              <Mutation
                mutation={editListingMutation}
                variables={{
                  spot_id: listing.spot.id,
                  listing_id: listing.id,
                  status: 6
                }}
                onCompleted={() => this.props.history.push('/')}
              >
                {editListing => <Button id="noticeBtn" onClick={() => {
                  editListing();
                  handleClose();
                }}>Cancel this listing</Button>}
              </Mutation>
            </div>
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default Reserving;


