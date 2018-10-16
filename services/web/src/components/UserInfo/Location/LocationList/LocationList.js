import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';
import './LocationList.css';
import { getLocationsQuery, deleteLocationMutation } from '../../../../queries/queriesLocation';
import Location from '../Location/Location.js';

class LocationList extends Component {

  displayLocations = () => {
    return (
      <Query query={getLocationsQuery} >
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;
            return (
              data.locations.map((location) => {
               return (
                <div key={location.id}>
                  <Form.Control>
                    <Location location={location} deleteLocation={this.deleteLocation}/>
                    
                  </Form.Control>
                </div>
               )}));
        }}
      </Query>
    )
  };
  
  displayLocationList =() => {
    return (
      <Form>
      {this.displayLocations()}
      </Form>
    );
  };

  deleteLocation = (locationId) => {
    this.props.deleteLocationMutation({
      variables: {
        id: locationId
      }
    })
    .then(() => {
      console.log('Location deleted!');
    })
    .catch((err) => {
      console.log(err);
    })
  };

  render() {
    return (
      <Container>
        <Row>
          <Col className="locationColTitles">
            Street 1
          </Col>
          <Col className="locationColTitles">
            Street 2
          </Col>
          <Col className="locationColTitles">
            City
          </Col>
          <Col className="locationColTitles">
            State
          </Col>
          <Col className="locationColTitles">
            Zip
          </Col>
          <Col></Col>
        </Row>
        {this.props.locations && (
          this.props.locations.map((location, index) => {
            return (
              <Row key={index}>
                <Col>
                  {location.street1}
                </Col>
                <Col>
                  {location.street2}           
                </Col>
                <Col>
                  {location.city}                
                </Col>
                <Col>
                  {location.state}                
                </Col>
                <Col>
                  {location.zip}                
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <input type="checkbox"></input>                    
                    </Col>
                    <Col>
                      <Mutation
                        mutation={deleteLocationMutation}
                        variables={{
                          id: location.id     
                        }}
                        >
                          {deleteLocation => 
                            <Button type="submit" variant="secondary" onClick={() => deleteLocation()}>-</Button>
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

export default LocationList;