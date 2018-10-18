import React from 'react';
import { Mutation } from 'react-apollo';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import { editListingMutation } from '../../../queries/queriesListing';
import moment from 'moment';

var colors = ["#F75330", "#ED3EC8", "#0C923E", "#00A392", "#0950B2", "#8F0AB9", "#D60000", "#9EC827", "#277AEC", "#ECB027"];

function hashId(str) { // java String#hashCode
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
     hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = parseFloat(hash.toString().slice(0,2)) % 10;
  return hash;
};

var Reserving = function({listing, handleClose, userInfo}) {
  var {spot, claiming_user, listing_user} = listing;
  var overtime;

  if (moment(listing.spot.end_time).isBefore(Date.now())) {
    overtime = (
      <Container>
        <Row>
          <Col className="centered">
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
          </Col>
        </Row>
      </Container>
    )
  };

  var buttons = (
    <React.Fragment>
      <div>
        <Container>
          <Row>
            <Col className="centered">
              <Mutation
                mutation={editListingMutation}
                variables={{
                  spot_id: listing.spot.id,
                  listing_id: listing.id,
                  status: listing.listing_user.id === userInfo.id ? 9 : 8
                }}
                onCompleted={() => this.props.history.push('/')}
              >
                {editListing => <Button 
                  className="confirmSwapBtn" 
                  style={{color: colors[hashId(listing.spot.id)]}}
                  onClick={() => {
                    editListing();
                    handleClose();
                  }}>Confirm Successful Swap</Button>}
              </Mutation>
            </Col>
          </Row>
          <Row>
            <Col className="centered">
              <Mutation
                mutation={editListingMutation}
                variables={{
                  spot_id: listing.spot.id,
                  listing_id: listing.id,
                  status: listing.listing_user.id === userInfo.id ? 7 : 6
                }}
                onCompleted={() => this.props.history.push('/')}
              >
                {editListing => <Button variant="link" onClick={() => {
                  editListing();
                  handleClose();
                }}>Cancel Swap</Button>}
              </Mutation>
            </Col>
          </Row> 
        </Container>
      </div>
    </React.Fragment>
  );

  if (listing_user.id === userInfo.id) {
    return (
      <div key={listing.id}>
        {/* <Card style={{backgroundColor: '#' + intToRGB(hashCode(listing.spot.id))}}> */}
        <Card style={{backgroundColor: colors[hashId(listing.spot.id)]}}>
          <Card.Body>
            {/* <div style={{color: '#' + intToRGB(hashCode(listing.spot.id))}}> */}
            <div style={{color: colors[hashId(listing.spot.id)]}}>
              <Row>
                <Col className="centered">
                  <h3><span className="background"><b>{claiming_user && claiming_user.user_name}</b> has claimed the spot!</span></h3>
                </Col>
              </Row>
              <Row>
                <Col className="centered">
                  {(claiming_user && claiming_user.user_cars[0]) && <p><span className="background">{claiming_user.user_cars[0].color} {claiming_user.user_cars[0].make} {claiming_user.user_cars[0].model}</span></p>}
                  {(claiming_user && claiming_user.user_cars[0]) && <div className="plate"><div className="license">{claiming_user.user_cars[0].plate}</div></div>}
                </Col>
              </Row>
              <Row>
                <Col className="centered">
                  <span className="background">{spot.street1} {spot.street2} {spot.city}</span>
                </Col>
              </Row>
              <Row>
                <Col className="centered">
                  <span className="background"> Show your screen and match colors with the other driver</span>
                </Col>
              </Row>
              <Row>
                <Col className="centered">
                  {buttons}
                  {overtime}
                </Col>  
              </Row>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  } 
  else {
    return (
      <div key={listing.id}>
        {/* <Card style={{backgroundColor: '#' + intToRGB(hashCode(listing.spot.id))}}>  */}
        <Card style={{backgroundColor: colors[hashId(listing.spot.id)]}}>
          <Card.Body>
            {/* <div style={{color: '#' + intToRGB(hashCode(listing.spot.id))}}> */}
            <div style={{color: colors[hashId(listing.spot.id)]}}>
              <Row>
                <Col className="centered">
                  <h3><span className="background">You have claimed the spot!</span></h3>
                </Col>
              </Row>
              <Row>
                <Col className="centered">
                  <b><span className="background">{spot.street1}, {spot.street2} {spot.city}</span></b>
                </Col>
              </Row>
              <Row>
                <Col className="centered">
                  <span className="background">You will swap spots with <b>{listing.listing_user.user_name}</b></span>
                  {(listing_user.user_cars[0]) && <p><span className="background">Driving a {listing_user.user_cars[0].color} {listing_user.user_cars[0].make} {listing_user.user_cars[0].model}</span></p>}
                  {(listing_user.user_cars[0]) && <div className="plate"><div className="license">{listing_user.user_cars[0].plate}</div></div>}
                </Col>
              </Row>
              <Row>
                <Col className="centered">
                  <span className="background">Show your screen and match colors with the other driver</span>           
                </Col>
              </Row>
              <Row>
                <Col className="centered">
                  {buttons}
                  {overtime}
                </Col>  
              </Row>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  };
};

export default Reserving;