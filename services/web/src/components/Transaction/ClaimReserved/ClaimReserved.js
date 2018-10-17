import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { editListingMutation, updateListingMutation } from'../../../queries/queriesListing';
import { Modal, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

class ClaimReserved extends Component {

  state = {
    clicked: false,
    modalShow: true,
    homeRedirect: false
  };

  twoFunctionMutation = (editSpotListing, updateListing) => {
    const spot_id = this.props.location.state.spot.id;
    const listing_id = this.props.location.state.spot.listing.id;
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

  changeClicked = () => {
    this.setState({
      clicked: true
    })
  };

  showRating = () => {
    let rating = "N/A";
    if (this.props.location.state.spot.listing.listing_user.rating !== null) {
      switch(this.props.location.state.spot.listing.listing_user.rating) {
        case 1:
          rating = "Red";
          break;
        case 2:
          rating = "Yellow";
          break;
        case 3:
          rating = "Green";
          break;
        default: 
          rating = "Green";
          break;
      }
    }
    return (
      rating
    );
  };
  
  handleClose = () => {
    this.setState({ homeRedirect: true });
  };

  render() {
    console.log(this.props.location.state)
    const timeLeft = moment(this.props.location.state.spot.end_time).fromNow(true);
    let spotValue;
    
    if (!this.props.location.state.spot.listing.value) {
      spotValue = 0;
    }
    else {
      spotValue = this.props.location.state.spot.listing.value;
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
                <Modal.Title>Reserve Spot</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <div>This spot is being held for another {timeLeft} by a <span className={this.showRating()}>{this.showRating()}</span> rating user. It can be yours for <b>${spotValue}</b>.</div>
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
                <Modal.Title>Reserve Spot</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <div>This spot will cost you <b>${spotValue}</b>. Are you sure you want to claim it?</div>
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