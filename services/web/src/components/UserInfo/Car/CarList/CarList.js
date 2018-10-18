import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './CarList.css';
import { deleteCarMutation } from '../../../../queries/queriesCar';

class CarList extends Component {
  state = {
    homeRedirect: false
  };

  handleClose = () => {
    this.setState({ homeRedirect: true });
  };

  render() {
    if (this.state.homeRedirect) {
      return <Redirect to={{
                pathname: '/profilePage'
              }} />;
    };

    return (
      <Container>
        <Row>
          <Col className="carColTitles">
            Make
          </Col>
          <Col className="carColTitles">
            Model
          </Col>
          <Col className="carColTitles">
            Color
          </Col>
          <Col className="carColTitles">
            State
          </Col>
          <Col className="carColTitles">
            Plate
          </Col>
          <Col></Col>
        </Row>
        {this.props.cars && (
          this.props.cars.map((car, index) => {
            return (
              <Row key={index}>
                <Col>
                  {car.make}
                </Col>
                <Col>
                  {car.model}           
                </Col>
                <Col>
                  {car.color}                
                </Col>
                <Col>
                  {car.state}                
                </Col>
                <Col>
                  {car.plate}                
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <input type="checkbox"></input>                    
                    </Col>
                    <Col>
                    <Mutation
                      mutation={deleteCarMutation}
                      variables={{
                        id: car.id     
                      }}
                      >
                        {deleteCar => 
                          <Button 
                            type="submit" 
                            id="addSubmitBtn" 
                            onClick={() => {
                              deleteCar();
                              this.handleClose();
                            }}>-</Button>
                        }
                      </Mutation>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          })
        )}
      </Container>
    );
  }
};

export default CarList;