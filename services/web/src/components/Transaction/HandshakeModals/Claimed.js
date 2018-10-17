import React from 'react';
import { Mutation } from 'react-apollo';
import { Button } from 'react-bootstrap';
import { editListingMutation } from '../../../queries/queriesListing';
import moment from 'moment';
import { hashCode, intToRGB } from '../../../utilities/ColorHasher';

var Reserving = function({listing, handleClose, userInfo}) {
  var {spot, claiming_user, listing_user} = listing;
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
        }}>{(listing_user.id === userInfo.id ? 'Claimer' : 'Lister')} Never Appeared</Button>}
      </Mutation>
    )
  }

  var buttons = (
    <React.Fragment>
      <Mutation
        mutation={editListingMutation}
        variables={{
          spot_id: listing.spot.id,
          listing_id: listing.id,
          status: 8
        }}
        onCompleted={() => this.props.history.push('/')}
      >
        {editListing => <Button variant="secondary" onClick={() => {
          editListing();
          handleClose();
        }}>Confirm Successful Swap</Button>}
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
    </React.Fragment>
  );

  if (listing_user.id === userInfo.id) {
    return (
      <div key={listing.id} style={{backgroundColor: '#' + intToRGB(hashCode(listing.spot.id))}}>
        <br/>
        <h3><span className="background"><b>{claiming_user && claiming_user.user_name}</b> has claimed the spot!</span></h3>
        {(claiming_user && claiming_user.user_cars[0])  && <p><span className="background">{claiming_user.user_cars[0].color} {claiming_user.user_cars[0].make} {claiming_user.user_cars[0].model}</span></p>}
        {(claiming_user && claiming_user.user_cars[0])  && <div className="plate"><div className="license">{claiming_user.user_cars[0].plate}</div></div>}
        <br/>
        <p><span className="background">{spot.street1}, {spot.street2} {spot.city}</span></p>
        <p><span className="background"> Show your screen and match colors with the other driver</span> </p>
        {buttons}
        {overtime}
        <br/>
        <br/>
      </div>
    );
  } else {
    return (
      <div key={listing.id} style={{backgroundColor: '#' + intToRGB(hashCode(listing.spot.id))}}>
        <br/>
        <h3><span className="background">You have claimed the spot!</span></h3>
        <p><b><span className="background">{spot.street1}, {spot.street2} {spot.city}</span></b></p>
        <p><span className="background">You will swap spots with <b>{listing.listing_user.user_name}</b></span></p>
        {(listing_user.user_cars[0])  && <p><span className="background">Driving a {listing_user.user_cars[0].color} {listing_user.user_cars[0].make} {listing_user.user_cars[0].model}</span></p>}
        {(listing_user.user_cars[0])  && <div className="plate"><div className="license">{listing_user.user_cars[0].plate}</div></div>}
        <br/>
        <p><span className="background">Show your screen and match colors with the other driver</span></p>
        {buttons}
        {overtime}
        <br/>
        <br/>
      </div>
    );
  }
}

export default Reserving;


