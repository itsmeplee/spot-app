import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { Button, Table, ButtonToolbar, Container, Card, Col, Row } from 'react-bootstrap';
import { getHistoryListings } from '../../../queries/queriesHistory';
import IndividualHistory from './IndividualHistory';
import './HistoryPage.css';

class HistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div>
        <Query query={getHistoryListings}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>;
            if (error) {
              return (
                <div> 
                  Error 
                  {console.log({error})}
                </div>
              )
            }
            if (data) { 
              console.log({data});
              let rows = data.myListingsHistory.map(item => {
                return <IndividualHistory key={item.id} item={item} />
              })
              
              return (
                <div>
                  <Container>
                    <Card>
                      <Card.Header>
                        <ButtonToolbar>
                          <Button variant="outline-dark" onClick={() => {this.props.history.push(`/`)}}>Go Back To Map</Button>
                        </ButtonToolbar>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col>
                            <Card.Title>Your Swap History</Card.Title>
                          </Col>
                          <Col className="right">
                            Rating: 
                          </Col>
                        </Row>
                        <Table bordered>
                          <thead>
                            <tr>
                              <th>Start Time</th>
                              <th>End Time</th>
                              <th>Type</th>
                              <th>Status</th>
                              <th>Street1</th>
                              <th>Street2</th>
                              <th>State</th>
                              <th>City</th>
                            </tr>
                          </thead>
                          <tbody>
                            { rows }
                          </tbody>
                        </Table>
                      </Card.Body>
                      <Card.Footer>
                        <ButtonToolbar>
                          <Button variant="outline-dark" onClick={() => {this.props.history.push(`/`)}}>Go Back To Map</Button>
                        </ButtonToolbar>
                      </Card.Footer>
                    </Card>
                  </Container>
                </div>
              )
            };
          }}
        </Query>
      </div>
    );
  };
};

export default withRouter(HistoryPage);