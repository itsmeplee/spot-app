import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { editListingMutation } from'../../../queries/queriesListing';
import { Button, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import './ClaimSpotted.css';

class ClaimSpotted extends Component {
  state = {
    clicked: false,
    modalShow: true,
    homeRedirect: false
  };

  changeClicked = () => {
    this.setState({
      clicked: true
    })
  };

  handleClose = () => {
    this.setState({ homeRedirect: true });
  };

  render() {
    if (this.state.homeRedirect) {
      return <Redirect to={{
                pathname: '/',
                state: {}
              }} />;
    };
    const spot_id = this.props.location.state.spot.id;
    const listing_id = this.props.location.state.spot.listing.id;
    const timeDiff = moment(this.props.location.state.spot.start_time).from(this.props.location.state.spot.end_time)
    // const timeDiff = moment(this.props.location.state.spot.start_time).fromNow();
    if (!this.state.clicked) {
      return (
        <React.Fragment>
        <div className="modal-container">
          <Modal show={this.state.modalShow} onHide={this.handleClose}>
            <Modal.Header closeButton className="modelHeader">
              <Modal.Title className="modelTitle">Claim Spot</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div id="claim-screen">
                <div>Parking spot was seen here {timeDiff}</div>
                <br/>
                <Mutation
                  mutation={editListingMutation}
                  variables={{
                    spot_id: spot_id,
                    listing_id: listing_id, 
                    status: 2
                  }}
                >
                  {editSpotListing => <Button variant="success" id="noticeBtn" onClick={() => {
                    editSpotListing();
                    this.changeClicked();
                    this.handleClose();
                  }}>I Parked Here</Button>}
                </Mutation>
                <br/>
                <br/>
                <Mutation
                  mutation={editListingMutation}
                  variables={{
                    spot_id: spot_id,
                    listing_id: listing_id,
                    status: 3
                  }}
                >
                  {editSpotListing => <Button variant="outline-secondary"  onClick={() => {
                    editSpotListing();
                    this.changeClicked();
                    this.handleClose();
                  }}>Spot No Longer Available</Button>}
                </Mutation>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </React.Fragment>
      );
    }
    else {
      return (
        <React.Fragment>
        <div className="modal-container">
          <Modal show={this.state.modalShow} onHide={this.handleClose}>
            <Modal.Header closeButton className="modelHeader">
              <Modal.Title className="modelTitle">Thanks</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                Thank you for being a great Spotter!
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </React.Fragment>
      )
    }
  };
};

export default withRouter(ClaimSpotted);

//beware that in SpotsList and Map, it's called ClaimSpot;