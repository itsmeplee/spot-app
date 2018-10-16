import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { Button, Table, ButtonToolbar } from 'react-bootstrap';
import Loader from '../../App/Loader';
import { getHistoryListings } from '../../../queries/queriesHistory';
import IndividualHistory from './IndividualHistory';

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
                  <ButtonToolbar>
                    <Button variant="outline-secondary" onClick={() => {this.props.history.push(`/`)}}>Go Back To Map</Button>
                  </ButtonToolbar>
                  <Table striped bordered hover>
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
                  <ButtonToolbar>
                    <Button variant="outline-secondary" onClick={() => {this.props.history.push(`/`)}}>Go Back To Map</Button>
                  </ButtonToolbar>
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