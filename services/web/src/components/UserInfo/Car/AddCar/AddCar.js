import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Button, Modal, Form, Alert, Col } from 'react-bootstrap';
import './AddCar.css';
import { addCarMutation } from '../../../../queries/queriesCar';

class AddCar extends Component {
  state = {
    size: '',
    make: '',
    model: '',
    color: '',
    plate: '',
    state: '',
    updateStatus: '',
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

  addCar = (mutation, e) => {
    e.preventDefault();
    mutation()
    .then((response) => {
      this.setState({
        updateStatus: 'Added'
      })
    })
    .then(() => {
      this.handleClose();
    })
    .catch((err) => {
      console.log('error', err);
      this.setState({
        updateStatus: err.message
      })
    });
  };

  render() {
    let { size, make, model, color, plate, state } = this.state;
    if (this.state.homeRedirect) {
      return <Redirect to={{
                pathname: '/profilePage'
              }} />;
    };
    return (
      <div className="modal-container">
        <Modal show={this.state.modalShow} onHide={this.handleClose} className="addModel">
          <Modal.Header closeButton className="modelHeader">
            <Modal.Title className="modelTitle">Add Car</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label className="labelTitle">Size: </Form.Label>
                <Form.Control as="select" name="size" value={size} onChange={(event) => this.handleInputChange(event)}>
                  <option value="1">Small</option>
                  <option value="2">Medium</option>
                  <option value="3">Large</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className="labelTitle">Make: </Form.Label>
                <Form.Control type="text" placeholder="Enter Make" name="make" value={make}
                  onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className="labelTitle">Model: </Form.Label>
                <Form.Control type="text" placeholder="Enter Model" name="model" value={model}
                  onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className="labelTitle">Color: </Form.Label>
                <Form.Control type="text" placeholder="Enter Color" name="color" value={color}
                  onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className="labelTitle">Plate: </Form.Label>
                <Form.Control type="text" placeholder="Enter Plate" name="plate" value={plate}
                  onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className="labelTitle">State: </Form.Label>
                <Form.Control type="text" placeholder="Enter State" name="state" value={state}
                  onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Col className="centered">
                  <Mutation
                    mutation={addCarMutation}
                    variables={{
                      size: parseInt(this.state.size, 10),
                      make: this.state.make,
                      model: this.state.model,
                      color: this.state.color,
                      plate: this.state.plate,
                      state: this.state.state
                    }}
                  >              
                  {mutation => <Button id="addSubmitBtn" onClick={(e) => {this.addCar(mutation, e)}}>Submit</Button>}
                  </Mutation>
                </Col>
              </Form.Group>
              {this.state.updateStatus && (
                  <Alert variant="warning">
                    {this.state.updateStatus}
                  </Alert>
                )}
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  };
};

export default withRouter(AddCar);
