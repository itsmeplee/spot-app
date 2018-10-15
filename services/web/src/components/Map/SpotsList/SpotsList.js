import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { getSpotsQuery, NEW_SPOTS_SUBSCRIPTION } from '../../../queries/queriesSpot';
import { addSpot, removeSpot } from '../../../utilities/mapHelper';

class SpotList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: []
    }
  };

  _subscribeToNewSpots = subscribeToMore => {
    subscribeToMore({
      document: NEW_SPOTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newSpot = subscriptionData.data.newSpot.node;

        // var openSpots = [newSpot, ...prev.openSpot];

        // var newSpotObj = {
        //   openSpot: openSpots,
        //   __typename: "openSpot"
        // };
        if(newSpot.is_available) {
          addSpot(newSpot, this.props.map, this.props.claimSpot);
        } else {
          removeSpot(newSpot, this.props.map);
        }
      }
    })
  }

  displaySpots(data) {
    this.state.spots = data.openSpot;  // HEY PHIL, CHECK THIS GREAT CODE OUT
    data.openSpot.forEach((spot) => {
      addSpot(spot, this.props.map, this.props.claimSpot);
    });
  };

  render() {
    return (
      <div className="Spots">
        <Query query={getSpotsQuery}>
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <div>Fetching</div>;
            if (error) return <div>Error</div>;

            this._subscribeToNewSpots(subscribeToMore);
            
            if (data.openSpot.length !== this.state.spots.length) this.displaySpots(data)
              return (
                <div></div>
              );
          }}
        </Query>
      </div>
    );
  }
};

export default withRouter(SpotList);