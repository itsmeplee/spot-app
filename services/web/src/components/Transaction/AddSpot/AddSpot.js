import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { addSpotMutation } from '../../../queries/queriesSpot';
import moment from 'moment';
import { Button, Modal, Row, Col, Container, Form, InputGroup, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

import './AddSpot.css';

mapboxgl.accessToken = 'pk.eyJ1IjoidHJlbnRnb2luZyIsImEiOiJjam11bDQwdGwyeWZ5M3FqcGFuaHRxd3Q2In0.UyaQAvC0nx08Ih7-vq3wag';

// THIS IS THE FORM TO ADD A SPOT
class AddSpot extends Component {
  state = {
      reservedToggle: false,
      start_time: moment().format(),
      end_time:  moment().add(15, 'minute').format(),
      modalShow: true,
      homeRedirect: false,
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
      value: 1,
      extra_time: 15,
      errorText: ''
  };

  changeView = (arg) => {
    this.setState({
      reservedToggle: arg
    })
  };

  handleClose = () => {
    this.setState({ homeRedirect: true });
  };

  handleInputTimeChange = (event) => { 
    let extraMin = event.target.value;
    let end_time = moment(this.state.start_time).add(extraMin, 'minute').format();
    this.setState({
      end_time: end_time,
      extra_time : extraMin
    })
  };

  componentDidMount() {
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.props.location.state.lng.toString()},${this.props.location.state.lat.toString()}.json?access_token=${mapboxgl.accessToken}`)
      .then(({data}) => {
        let addressHolder = {};
        data.features.forEach((feature) => {
          let type = feature['place_type'][0];
          if (type === 'address') {
            if (feature.address !== undefined) {
              addressHolder.street1 = feature.address + ' ' + feature.text;
            } else {
              addressHolder.street1 = feature.text;
            }
          } else if (type === 'neighborhood') {
            addressHolder.street2 = feature.text
          } else if (type === 'postcode') {
            addressHolder.zip = feature.text
          } else if (type === 'place') {
            addressHolder.city = feature.text
          } else if (type === 'region') {
            addressHolder.state = feature.text
          }
        })
        this.setState({
          street1: addressHolder.street1,
          street2: addressHolder.street2,
          zip: addressHolder.zip,
          city: addressHolder.city,
          state: addressHolder.state
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  submitForm = (addSpot, event) => {
    event.preventDefault();
    // if holding - check for hold time and value
    if(this.state.reservedToggle) { 
      if (this.state.value === '' && this.state.extra_time === '')
      {
        this.setState({
          errorText: 'Please enter Time and Value.'
        });
        return;
      }
    }
    // run addSpot to add Spot
    addSpot()
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log('error', err);
        this.setState({
          errorText: err.message
        })
      });

  };

  displayTimeForReservedSpots = () => {
    const { lng =  (this.props.location.state.lng).toString(),
      lat = (this.props.location.state.lat).toString(),
      type =  this.state.reservedToggle ? 1 : 2,
      start_time =  this.state.start_time,
      end_time = this.state.end_time,
      status = 1,
      street1 = this.state.street1,
      street2 = this.state.street2,
      zip = parseInt(this.state.zip, 10),
      city = this.state.city,
      state = this.state.state,
      value = this.state.value } = this.state

    if (this.state.reservedToggle) {
      return (
        <React.Fragment>
          <div>
            <Form.Group controlId="formHoldSpotTime">
              <Form.Label>Holding for (min):</Form.Label>
              <Form.Control type="text" placeholder="Minutes" value={this.state.extra_time} onChange={(e) => this.handleInputTimeChange(e)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="formHoldSpotValue">
              <Form.Label>Sell for:</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="text" placeholder="Value" value={this.state.value} onChange={e => this.setState({ value: e.target.value })} ></Form.Control>
              </InputGroup>
            </Form.Group>
          </div>
          <div> 
            <Mutation
              mutation={addSpotMutation}
              variables={{ lng, lat, type, start_time, end_time, status, street1, street2, zip, city, state, value }}
              onCompleted={(data) => this._confirm(data)}
            >
            {addSpot => (
              <Button 
                type="button" 
                className="holdingSpotBtn"
                onClick={(e) => this.submitForm(addSpot, e)}
              >List</Button> 
            )}
            </Mutation>
          </div>
        </React.Fragment>
      );
    }
  };

  _confirm = (data) => {
    this.setState({ homeRedirect: true });
  }

  render() {
    if (this.state.homeRedirect) {return <Redirect to={{
      pathname: '/',
      state: {}
    }} />;};

    const { lng =  (this.props.location.state.lng).toString(),
        lat = (this.props.location.state.lat).toString(),
        type =  this.state.reservedToggle ? 1 : 2,
        start_time =  this.state.start_time,
        end_time = this.state.end_time,
        status = 1,
        street1 = this.state.street1,
        street2 = this.state.street2,
        zip = parseInt(this.state.zip, 10),
        city = this.state.city,
        state = this.state.state,
        value = this.state.value } = this.state

    return (
      <React.Fragment>
        <div className="modal-container">
          <Modal show={this.state.modalShow} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>List a Spot</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container className="addSpot">
                <Row>
                    <Col>
                      Spot located at {this.state.street1}, {this.state.street2}                    
                    </Col>
                </Row>
                <Row>
                  <Col>
                    <Button 
                      type="button" 
                      className="holdingSpotBtn"
                      onClick={() => this.changeView(true)}
                    > I am holding a Spot </Button>
                  </Col>
                  <Col className="center">
                    OR
                  </Col>
                  <Col>
                    <Mutation
                      mutation={addSpotMutation}
                      variables={{ lng, lat, type, start_time, end_time, status, street1, street2, zip, city, state, value }}
                      onCompleted={(data) => this._confirm(data)}
                    >
                      {addSpot => (
                            <Button 
                              type="button" 
                              className="noticeSpotBtn"
                              onClick={(e) => {
                                this.submitForm(addSpot, e);
                                this.changeView(false)
                              }}   
                            >I noticed a Spot</Button> 
                      )}
                      </Mutation>
                  </Col> 
                </Row>
                <Row>
                    <Col>
                      <Form>
                        {this.displayTimeForReservedSpots()}
                        {this.state.errorText && (
                          <Alert variant="warning">
                          {this.state.errorText}
                        </Alert>
                        )}
                      </Form>
                    </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              
            </Modal.Footer>
          </Modal>
        </div>
      </React.Fragment>
    );
  };
};

export default AddSpot;
