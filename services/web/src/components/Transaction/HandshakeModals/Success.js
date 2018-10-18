import React from 'react';
import { Mutation } from 'react-apollo';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { updateListingMutation } from '../../../queries/queriesListing';
import moment from 'moment';

var Success = function({listing, handleClose}) {
  return (
    <React.Fragment>
      <Container>
        <div key={listing.id}>
          <Card className="reservingCard">
            <Card.Body>
              <Row>
                <Col className="centered">
                  <h3>Spot Swapped!</h3>
                </Col>
              </Row>
              <Row>
                <Col className="centered">
                  <img src="/handshake.svg" width="80" height="80" alt="" />
                  <div id="credit">Icons made by <a href="https://www.flaticon.com/authors/tomas-knop" title="Tomas Knop">Tomas Knop</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC 3.0 BY</a></div>
                </Col>
              </Row>
              <Row>
                <Col className="centered">Drive safely, and keep swapping!</Col>
              </Row>
              <Row>
                <Col className="centered">
                  <h3>Spot Swapped!</h3>
                </Col>
              </Row>
              <Row>
                <Col className="centered">
                  <Mutation
                    mutation={updateListingMutation}
                    variables={{
                      spot_id: listing.spot.id,
                      id: listing.id,
                      time_complete: moment().format()
                    }}
                  >
                    {editListing => <Button id="noticeBtn" onClick={() => {
                      editListing();
                      handleClose();
                    }}>Close</Button>}
                  </Mutation>
                </Col>
              </Row>

            </Card.Body>
          </Card>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default Success;


