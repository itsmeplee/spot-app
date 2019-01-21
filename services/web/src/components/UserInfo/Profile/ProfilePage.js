import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { Button, Form, Container, Col, Row, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../../App/Loader';
import CarList from '../Car/CarList/CarList';
import LocationList from '../Location/LocationList/LocationList';
import { getUserQuery, mutationUser } from '../../../queries/queriesUser';

import './ProfilePage.css';

class ProfilePage extends Component {
  state = {
    empty: true,
    toogleCarList: false,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    balance: 0,
    cars: [],
    locations: [],
    rating: null,
    updateStatus: ''
  }

  getUserInfo = (data) => {
    let balance = data.userInfo.balance ? data.userInfo.balance : this.state.balance

    this.setState({
      username: data.userInfo.user_name,
      firstName: data.userInfo.first_name,
      lastName: data.userInfo.last_name,
      email: data.userInfo.email,
      cars: data.userInfo.user_cars,
      locations: data.userInfo.locations,
      rating: data.userInfo.rating,
      balance: balance,
      empty: false
    })
  };

  handleInputChange = (evt) => {
    evt.preventDefault();
    this.setState({ 
      [evt.target.name]: evt.target.value 
    })
  };

  showRating = () => {
    let rating = "N/A";
    if (this.state.rating !== null) {
      switch(this.state.rating) {
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

  editUser = (mutation, e) => {
    e.preventDefault(); 
    mutation()
    .then((response) => {
      this.setState({
        updateStatus: 'Updated'
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
    if (this.state.empty) {
      return (
        <Query query={getUserQuery}>
          {({ loading, error, data }) => {
            if (loading) return <Loader></Loader>;
            if (error) return <div>Error {console.log('Error: ',{error})}</div>;
            if (data) { 
              this.getUserInfo(data); 
              return <div></div> 
            };
          }}
        </Query>
      );
    }
    else {
      let { username, firstName, lastName, balance, email, password } = this.state
      return (  
        <Container className="profilePage">
          <Row className="profileRow">
            <Col>
              <Button id="goToMapBtn" onClick={() => {this.props.history.push(`/`)}}>Go Back To Map</Button>
            </Col>
          </Row>
          <Row className="profileRow">
            <Col>
            <Form>
              <Card>
                <Card.Header as="h5">Profile</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <Form.Group controlId="formGroupUsername">
                      <Form.Label className="profileLabels">Username: </Form.Label>
                      <Form.Control type="text" placeholder="Username" name="username" value={username} 
                        onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Row>
                        <Col className='right'>
                        Rating: <span className={this.showRating()}>{this.showRating()}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="right">
                            Balance: $ {balance}
                        </Col>
                      </Row>
                    </Col>
                    </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="formGroupFirstname">
                      <Form.Label className="profileLabels">First Name: </Form.Label>
                      <Form.Control type="text" placeholder="First Name" name="firstName" value={firstName}
                        onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formGroupLastname">
                      <Form.Label className="profileLabels">Last Name: </Form.Label>
                      <Form.Control type="text" placeholder="Last Name" name="lastName" value={lastName}
                        onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="formGroupEmail">
                      <Form.Label className="profileLabels">Email: </Form.Label>
                      <Form.Control type="text" placeholder="Email" name="email" value={email}
                        onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formGroupPassword">
                      <Form.Label className="profileLabels">Password: </Form.Label>
                      <Form.Control type="text" placeholder="Password" name="password" value={password}
                        onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4} className="centered">
                      {this.state.updateStatus && (
                        <Alert variant="warning">
                          {this.state.updateStatus}
                        </Alert>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Mutation
                      mutation={mutationUser}
                      variables={{
                        user_name: this.state.username,
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        email: this.state.email,
                        password: this.state.password    
                      }}
                      >
                        {mutation => 
                          <Button type="submit" id="addSubmitBtn" onClick={(e) => {this.editUser(mutation,e);}}>Update</Button>
                        }
                      </Mutation>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              </Form>
            </Col>
          </Row>
          {/* <Row className="profileRow">
            <Col>
              <Card>
                <Card.Header as="h5">Payment</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>
                        <CardForm />
                      </Col>
                    </Row>
                  </Card.Body>
              </Card>
            </Col>
          </Row> */}
          <Row className="profileRow">
            <Col>
            <Card>
              <Card.Header as="h5">Car</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                        <CarList cars={this.state.cars}></CarList>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <Link to={'/addCar'} className="footerLink">Add your car</Link><br />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="profileRow">
            <Col>
            <Card>
              <Card.Header as="h5">Location</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                        <LocationList locations={this.state.locations}></LocationList>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Link to={'/addLocation'} className="footerLink">Add your location</Link><br />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    }
  };
};

export default withRouter(ProfilePage);