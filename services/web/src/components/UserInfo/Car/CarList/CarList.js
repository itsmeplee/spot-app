import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './CarList.css';
import { deleteCarMutation } from '../../../../queries/queriesCar';

class CarList extends Component {

  render() {
    return (
      <Container>
        <Row>
          <Col>
            Make
          </Col>
          <Col>
            Model
          </Col>
          <Col>
            Color
          </Col>
          <Col>
            State
          </Col>
          <Col>
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
                        {mutation => 
                          <Button type="submit" onClick={()=>mutation()}>-</Button>
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