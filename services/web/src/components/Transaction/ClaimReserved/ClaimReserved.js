import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { editListingMutation, updateListingMutation } from'../../../queries/queriesListing';
import { Modal, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

class ClaimReserved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      modalShow: true,
      homeRedirect: false
    };
    this.changeClicked = this.changeClicked.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.twoFunctionMutation = this.twoFunctionMutation.bind(this);
  };

  twoFunctionMutation(editSpotListing, updateListing) {
    const spot_id = this.props.location.state.spotId;
    const listing_id = this.props.location.state.listingId;
    editSpotListing({
      variables: {
        spot_id: spot_id,
        listing_id: listing_id,
        status: 2
      }
    })
    .then(() => {
      updateListing({
        variables: {
          id: listing_id,
          spot_id: spot_id,
          claimer: true
        }
      })
    })
    .catch((err) => {
      console.log('Error in twoFunctionMutation in ClaimReserved', err);
    })
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
    const timeLeft = moment(this.props.location.state.end_time).fromNow(true);
    let spotValue;
    
    if (!this.props.location.state.value) {
      spotValue = 0;
    }
    else {
      spotValue = this.props.location.state.value;
    }

    if (this.state.homeRedirect) {
      return <Redirect to={{
                pathname: '/',
                state: {}
              }} />;
    };
    
    if (!this.state.clicked) {
      return (
        <React.Fragment>
          <div className="modal-container">
            <Modal show={this.state.modalShow} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <div>This spot is being held for another {timeLeft}.</div>
                  <div>It can be yours for ${spotValue}.</div>
                  <button onClick={this.changeClicked}>Claim Spot</button>
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
      if (this.state.homeRedirect) {
        return <Redirect to={{
                  pathname: '/',
                  state: {}
                }} />;
      };
      return (
        <React.Fragment>
          <div className="modal-container">
            <Modal show={this.state.modalShow} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <div>Are you sure?</div>
                  <Mutation
                    mutation={editListingMutation}
                    onCompleted={() => {
                      this.setState({
                        homeRedirect: true
                      })
                    }}
                  >
                    {editSpotListing => (
                      <Mutation
                        mutation={updateListingMutation}
                      >

                      {(updateListing) => <button onClick={() => {this.twoFunctionMutation(editSpotListing, updateListing)}}>Claim Spot</button>}
                      </Mutation>
                    )}
                  </Mutation>
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

export default withRouter(ClaimReserved);

//need to editListing too so to change status of listing