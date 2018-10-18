import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { Button, Table, ButtonToolbar, Container, Card, Col, Row } from 'react-bootstrap';
import Loader from '../../App/Loader';
import { getHistoryListings } from '../../../queries/queriesHistory';
import IndividualHistory from './IndividualHistory';
import './HistoryPage.css';

class HistoryPage extends Component {
  showRating = () => {
    let rating = "N/A";
    if (this.props.history.location.state.rating !== null) {
      switch(this.props.history.location.state.rating) {
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

  render() {
    return (
      <div>
        <Query query={getHistoryListings}>
          {({ loading, error, data }) => {
            if (loading) return <Loader></Loader>;
            if (error) {
              return (
                <div> 
                  Error 
                  {console.log({error})}
                </div>
              )
            }
            if (data) { 
              let rows = data.myListingsHistory.map(item => {
                return <IndividualHistory key={item.id} item={item} />
              })
              return (
                <div>
                  <Container>
                    <Card>
                      <Card.Header>
                        <ButtonToolbar>
                          <Button id="goToMapBtn" onClick={() => {this.props.history.push(`/`)}}>Go Back To Map</Button>
                        </ButtonToolbar>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col>
                            <Card.Title>Your Swap History</Card.Title>
                          </Col>
                          <Col className="right">
                            Rating: <span className={this.showRating()}>{this.showRating()}</span>
                          </Col>
                        </Row>
                        <div className="table-responsive">
                        <Table bordered className="table">
                          <thead>
                            <tr>
                              <th>Date/Time</th>
                              <th>Type</th>
                              <th>Status</th>
                              <th>Street1</th>
                              <th>Street2</th>
                              <th>City</th>
                            </tr>
                          </thead>
                          <tbody>
                            { rows }
                          </tbody>
                        </Table>
                        </div>
                      </Card.Body>
                      <Card.Footer>
                        <ButtonToolbar>
                          <Button id="goToMapBtn" onClick={() => {this.props.history.push(`/`)}}>Go Back To Map</Button>
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