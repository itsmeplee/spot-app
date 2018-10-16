import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
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
        <Modal show={this.state.modalShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Car</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Size: </Form.Label>
                <Form.Control as="select" name="size" value={size} onChange={(event) => this.handleInputChange(event)}>
                  <option value="1">Small</option>
                  <option value="2">Medium</option>
                  <option value="3">Large</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Make: </Form.Label>
                <Form.Control type="text" placeholder="Make" name="make" value={make}
                  onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Model: </Form.Label>
                <Form.Control type="text" placeholder="Model" name="model" value={model}
                  onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Color: </Form.Label>
                <Form.Control type="text" placeholder="Color" name="color" value={color}
                  onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Plate: </Form.Label>
                <Form.Control type="text" placeholder="Plate" name="plate" value={plate}
                  onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>State: </Form.Label>
                <Form.Control type="text" placeholder="State" name="state" value={state}
                  onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
              </Form.Group>
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
                // onCompleted={() => this.props.history.push('/profilePage')}
              >              
              {mutation => <Button onClick={(e) => {this.addCar(mutation, e)}}>Submit</Button>}
              </Mutation>
              {this.state.updateStatus && (
                  <Alert variant="warning">
                    {this.state.updateStatus}
                  </Alert>
                )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
};

export default withRouter(AddCar);
