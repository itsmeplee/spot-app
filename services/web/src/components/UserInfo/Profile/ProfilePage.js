import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import CarList from '../Car/CarList/CarList';
import LocationList from '../Location/LocationList/LocationList';
import { getUserQuery, mutationUser } from '../../../queries/queriesUser';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: true,
      toogleCarList: false,
      username: '',
      firstName: '',
      lastName: '',
      default_car: {},
      rating: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.changeDefaultCar = this.changeDefaultCar.bind(this);
  };

  getUserInfo(data) {
    console.log('data', data);
    let defaultCar = data.userInfo.user_cars.default_car ? data.userInfo.user_cars.default_car : null
    this.setState({
      username: data.userInfo.user_name,
      firstName: data.userInfo.first_name,
      lastName: data.userInfo.last_name,
      defaultCar: defaultCar,
      rating: data.userInfo.rating,
      empty: false
    })
  };

  changeDefaultCar(car) {
    this.setState({
      default_car: car
    })
  };

  handleInputChange(evt) {
    evt.preventDefault();
    this.setState({ 
      [evt.target.name]: evt.target.value 
    })
  };

  render() {
    console.log('props', this.props);

    if (this.state.empty) {
      return (
        <Query query={getUserQuery}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>;
            if (error) return <div>Error {console.log({error})}</div>;
            if (data) { 
              this.getUserInfo(data); 
              return <div></div> 
            };
          }}
        </Query>
      );
    }
    else {
      let { username, firstName, lastName } = this.state
      return (  
        <React.Fragment>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Rating: </Form.Label>
              <div>{this.state.rating}</div>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Username: </Form.Label>
              <Form.Control type="text" placeholder="Username" name="username" value={username} 
                onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>First Name: </Form.Label>
              <Form.Control type="text" placeholder="First Name" name="firstName" value={firstName}
                onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name: </Form.Label>
              <Form.Control type="text" placeholder="Last Name" name="lastName" value={lastName}
                onChange={(evt) => this.handleInputChange(evt)}></Form.Control>
            </Form.Group>
            <Mutation
              mutation={mutationUser}
              variables={{
                user_name: this.state.username,
                first_name: this.state.firstName,
                last_name: this.state.lastName      
              }}
            >
              {userEdit => 
                <Button type="submit" onClick={() => {userEdit()}}>Submit Edits</Button>
              }
            </Mutation>
            <Form.Group>
              <Form.Label>Default Car: </Form.Label>
              <div>
                {this.state.default_car.make}
              </div>
            </Form.Group>
            <Form.Group>
              <CarList changeDefaultCar={this.changeDefaultCar}/>
            </Form.Group>
          </Form>
          <div>
            <Link to={'/addCar'}>Add your car</Link>
          </div>
          <div>
            <div>
              <LocationList />
            </div>
            <Link to={'/addLocation'}>Add your location</Link>
          </div>
          
          <Button onClick={() => {this.props.history.push(`/`)}}>Go Back To Map</Button> 
        </React.Fragment>
      );
    }
  };
};

export default withRouter(ProfilePage);