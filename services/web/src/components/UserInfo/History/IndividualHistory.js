import React, { Component } from 'react';
import './HistoryPage.css';

class IndividualHistory extends Component {

  render() {
    const { item } = this.props; 
  
    if (item.status === 4 || item.status === 5 || item.status === 6 || item.status === 7) {
      return (
        <tr className="redRow">
        <td>{item.spot.start_time}</td>
        <td>{item.spot.end_time}</td>
        <td>{item.type}</td>
        <td>{item.status}</td>
        <td>{item.spot.street1}</td>
        <td>{item.spot.street2}</td>
        <td>{item.spot.state}</td>
        <td>{item.spot.city}</td>
      </tr>
      )
    }
    else {
      return (
        <tr className={item.type === 1 ? "blueRow" : "greenRow"}>
          <td>{item.spot.start_time}</td>
          <td>{item.spot.end_time}</td>
          <td>{item.type}</td>
          <td>{item.status}</td>
          <td>{item.spot.street1}</td>
          <td>{item.spot.street2}</td>
          <td>{item.spot.state}</td>
          <td>{item.spot.city}</td>
        </tr>
      );
    };
  };
};

export default IndividualHistory;