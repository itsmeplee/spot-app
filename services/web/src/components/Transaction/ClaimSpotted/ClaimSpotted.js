import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { editListingMutation } from'../../../queries/queriesListing';
import { Button, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import './ClaimSpotted.css';

class ClaimSpotted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      modalShow: true,
      homeRedirect: false
    };
    this.changeClicked = this.changeClicked.bind(this);
    this.handleClose = this.handleClose.bind(this);
  };

  changeClicked() {
    this.setState({
      clicked: true
    })
  };

  handleClose() {
    this.setState({ homeRedirect: true });
  };

  render() {
    if (this.state.homeRedirect) {
      return <Redirect to={{
                pathname: '/',
                state: {}
              }} />;
    };
    const spot_id = this.props.location.state.spotId;
    const listing_id = this.props.location.state.listingId;
    const timeDiff = moment(this.props.location.state.start_time).from(this.props.location.state.end_time)
    // const timeDiff = moment(this.props.location.state.start_time).fromNow();
    if (!this.state.clicked) {
      return (
        <React.Fragment>
        <div className="modal-container">
          <Modal show={this.state.modalShow} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Claim Spot</Modal.Title>
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
                  onCompleted={() => this.props.history.push('/')}
                >
                  {editSpotListing => <Button variant="success" onClick={() => {
                    editSpotListing();
                    this.changeClicked();
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
                  onCompleted={() => this.props.history.push('/')}
                >
                  {editSpotListing => <Button variant="outline-secondary"  onClick={() => {
                    editSpotListing();
                    this.changeClicked();
                  }}>Spot No Longer Available</Button>}
                </Mutation>
                
                
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
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
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                Thank you for being a great Spotter!
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </React.Fragment>
      )
    }
    
  };
};

export default withRouter(ClaimSpotted);


//beware that in SpotsList and Map, it's called ClaimSpot;