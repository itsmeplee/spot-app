import React from 'react';
import { Button } from 'react-bootstrap';

var Reserving = function({listing, handleCloseAndRemove}) {
  return (
    <React.Fragment>
      <div key={listing.id}>
        <h3>Spot Swapped!</h3>
        <img src="/handshake.svg" width="80" height="80" alt="" />
        <div id="credit">Icons made by <a href="https://www.flaticon.com/authors/tomas-knop" title="Tomas Knop">Tomas Knop</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC 3.0 BY</a></div>
        <p>Drive safely, and keep swapping!</p>
        <br></br>
        <Button onClick={() => {
            handleCloseAndRemove();
          }}
        >
          Close
        </Button>
      </div>
    </React.Fragment>
  )
}

export default Reserving;


