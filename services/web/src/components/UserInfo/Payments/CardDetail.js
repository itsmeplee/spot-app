import React,  { Component } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { Button, Form, Row, Col } from 'react-bootstrap';

class CardDetail extends Component {
  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then((payload) => console.log('[token]', payload));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formGroupCardDetail">
        <Form.Label className="profileLabels">Card Details:</Form.Label>
        </Form.Group>
        <CardElement />
        <Form.Group controlId="formGroupCardDetail">
        </Form.Group>
        <Form.Group controlId="formGroupCardDetail">
          <Button variant="secondary">Add Card</Button> 
        </Form.Group>
      </Form>
    );
  };
};

export default injectStripe(CardDetail);