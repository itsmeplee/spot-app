import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CardDetail from './CardDetail';

class CardForm extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_nOb7Z4hfOyKtvGpaNSb3nahV">
        <Elements>
          <CardDetail />
        </Elements>
      </StripeProvider>
    );
  };
};

export default CardForm;

