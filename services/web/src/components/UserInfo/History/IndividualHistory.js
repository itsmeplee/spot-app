import React, { Component } from 'react';
import './HistoryPage.css';

class IndividualHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    const { item } = this.props; 
    let startDate = item.spot.start_time.slice(0,10);
    let startTime = item.spot.start_time.slice(11,16);
    let status = "N/A"
    if (item.status !== null) {
      switch(item.status) {
        case 1:
          status = "Unclaimed/Open";
          break;
        case 2:
          status = "Claimed";
          break;
        case 3:
          status = "Unclaimed/Closed";
          break;
        case 4:
          status = "No show/Holder";
          break;
        case 5:
          status = "No show/Claimer";
          break;
        case 6:
          status = "Cancelled/Holder";
          break;
        case 7:
          status = "Cancelled/Claimer";
          break;
        case 8:
          status = "Successful Swap";
          break;
        case 9:
          status = "Successful Swap";
          break;
      }
    }
  
    if (item.status === 4 || item.status === 5 || item.status === 6 || item.status === 7) {
      return (
        <tr className="redRow">
        <td>{startDate} / {startTime}</td>
        <td>{item.type === 1 ? "Reserved" : "Spotted"}</td>
        <td>{status}</td>
        <td>{item.spot.street1}</td>
        <td>{item.spot.street2}</td>
        <td>{item.spot.city}</td>
      </tr>
      )
    }
    else {
      return (
        <tr className={item.type === 1 ? "blueRow" : "greenRow"}>
          <td>{startDate} / {startTime}</td>
          <td>{item.type === 1 ? "Reserved" : "Spotted"}</td>
          <td>{status}</td>
          <td>{item.spot.street1}</td>
          <td>{item.spot.street2}</td>
          <td>{item.spot.city}</td>
        </tr>
      );
    };
  };
};

export default IndividualHistory;