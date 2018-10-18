import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import './AddLocation.css';
import { addLocationMutation } from '../../../../queries/queriesLocation';

class AddLocation extends Component {

  state = {
    name: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: null,
    homeRedirect: false,
    modalShow: true,
  };

  handleInputChange = (evt) => {
    evt.preventDefault();
    this.setState({ 
      [evt.target.name]: evt.target.value 
    })
  };

  handleClose = () => {
    this.setState({ homeRedirect: true });
  };
  
  render = () => {
    const { name, street1, street2, city, state } = this.state
    const zip = parseInt(this.state.zip, 10)
    if (this.state.homeRedirect) {
      return <Redirect to={{
                pathname: '/profilePage'
              }} />;
    };
    return (
      <React.Fragment>
        <div className="modal-container">
          <Modal show={this.state.modalShow} onHide={this.handleClose}>
            <Modal.Header closeButton className="modelHeader">
              <Modal.Title className="modelTitle">Add Location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label className="labelTitle">Location Name: </Form.Label>
                  <Form.Control  type="text" placeholder="Location Name" name="name" value={name} 
                    onChange={(evt) => this.handleInputChange(evt)} >
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="labelTitle">Street 1: </Form.Label>
                  <Form.Control type="text" placeholder="Street 1" name="street1" value={street1}
                    onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="labelTitle">Street 2: </Form.Label>
                  <Form.Control type="text" placeholder="Street 2" name="street2" value={street2}
                    onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="labelTitle">City: </Form.Label>
                  <Form.Control type="text" placeholder="City" name="city" value={city}
                    onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="labelTitle">State: </Form.Label>
                  <Form.Control type="text" placeholder="State" name="state" value={state}
                    onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="labelTitle">Zip: </Form.Label>
                  <Form.Control type="number" placeholder="Zip" name="zip" value={zip}
                    onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Col className="centered">
                    <Mutation
                      mutation={addLocationMutation}
                      variables={{
                        name: this.state.name,
                        street1: this.state.street1,
                        street2: this.state.street2,
                        city: this.state.city,
                        state: this.state.state,
                        zip: parseInt(this.state.zip, 10),
                        user_id: this.props.user_id
                      }}
                    >              
                    {addLocation => <Button 
                      id="addSubmitBtn" 
                      onClick={() => {
                        addLocation();
                        this.handleClose();
                      }}>Submit</Button>}
                    </Mutation>
                  </Col>
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </React.Fragment>
    );
  };
};

export default withRouter(AddLocation);
