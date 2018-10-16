import React, { Component } from 'react';
import { Mutation, Query, graphql, compose } from 'react-apollo';
import { Button, Modal, Form, Container, Row, Col, ToggleButton } from 'react-bootstrap';
import './CarList.css';
import { getCarsQuery, deleteCarMutation, editCarMutation } from '../../../../queries/queriesCar';
import Car from '../Car/Car';

class CarList extends Component {

  render() {
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
                          <Button type="submit" variant="secondary" onClick={() => deleteCar()}>-</Button>
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