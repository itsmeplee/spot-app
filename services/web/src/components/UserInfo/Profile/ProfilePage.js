import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { Button, Form, Container, Col, Row, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
    balance: 0,
    cars: [],
    locations: [],
    rating: null,
    updateStatus: ''
  }

  getUserInfo = (data) => {
    let balance = data.userInfo.balance ? data.userInfo.balance : this.state.balance

    console.log(data.userInfo.user_cars);

    this.setState({
      username: data.userInfo.user_name,
      firstName: data.userInfo.first_name,
      lastName: data.userInfo.last_name,
      cars: data.userInfo.user_cars,
      locations: data.userInfo.locations,
      rating: data.userInfo.rating,
      balance: balance,
      empty: false
    })
  };

  changeDefaultCar = (car) => {
    this.setState({
      default_car: car
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
    if(this.state.rating != null) {
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
  }

  render() {
    if (this.state.empty) {
      return (
        <Query query={getUserQuery}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>;
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
      let { username, firstName, lastName, balance } = this.state
      return (  
        <Container className="profilePage">
          <Row className="profileRow">
            <Col>
            <Form>
              <Card>
                <Card.Header as="h5">Profile</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <Form.Group controlId="formGroupUsername">
                      <Form.Label>Username: </Form.Label>
                      <Form.Control type="text" placeholder="Username" name="username" value={username} 
                        onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Row>
                        <Col className={this.showRating() + ' right'}>
                          Rating : {this.showRating()}
                        </Col>
                      </Row>
                      <Row>
                        <Col className="right">
                            Balance : $ {balance}
                        </Col>
                      </Row>
                    </Col>
                    </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="formGroupFirstname">
                      <Form.Label>First Name: </Form.Label>
                      <Form.Control type="text" placeholder="First Name" name="firstName" value={firstName}
                        onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formGroupLastname">
                      <Form.Label>Last Name: </Form.Label>
                      <Form.Control type="text" placeholder="Last Name" name="lastName" value={lastName}
                        onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
                      </Form.Group>
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
                        last_name: this.state.lastName      
                      }}
                      >
                        {mutation => 
                          <Button type="submit" onClick={(e) => {this.editUser(mutation,e);}}>Update</Button>
                        }
                      </Mutation>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              </Form>
            </Col>
          </Row>
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
                    <Link to={'/addCar'}>Add your car</Link><br />
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
                      <Link to={'/addLocation'}>Add your location</Link><br />
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