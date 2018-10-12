import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import './AddCar.css';
import { getCarsQuery, addCarMutation } from '../../../../queries/queriesCar';

class AddCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '',
      make: '',
      model: '',
      color: '',
      plate: '',
      state: '',
      default_car: false,
      homeRedirect: false,
      modalShow: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  };

  handleInputChange(evt) {
    evt.preventDefault();
    this.setState({ 
      [evt.target.name]: evt.target.value 
    })
  };

  handleClose() {
    this.setState({ homeRedirect: true });
  };

  render() {
    let { size, make, model, color, plate, state } = this.state;
    if (this.state.homeRedirect) {
      return <Redirect to={{
                pathname: '/profilePage'
              }} />;
    };
    return (
      <React.Fragment>
        <div className="modal-container">
          <Modal show={this.state.modalShow} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Car</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Size: </Form.Label>
                  <Form.Control as="select" name="size" value={size} onChange={(event) => this.handleInputChange(event)} value={this.state.size}>
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
                <Form.Group>
                  <Form.Label>State: </Form.Label>
                  <Form.Check 
                    label="Make This Your Default Car" 
                    onClick={() => {
                      this.setState({
                        default_car: true
                      })
                    }}
                  />
                </Form.Group>
                <Mutation
                  mutation={addCarMutation}
                  variables={{
                    size: parseInt(this.state.size, 10),
                    make: this.state.make,
                    model: this.state.model,
                    color: this.state.color,
                    plate: this.state.plate,
                    state: this.state.state,
                    default_car: this.state.default_car
                  }}
                  onCompleted={() => this.props.history.push('/profilePage')}
                >              
                {addCar => <Button onClick={addCar}>+</Button>}
                </Mutation>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </React.Fragment>
    );
  };
};

export default withRouter(AddCar);
