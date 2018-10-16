import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../../constants';
import { Mutation } from 'react-apollo';
import { signupQuery, loginQuery } from '../../queries/queriesUser';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import './Login.css';

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      login: true, // swith between login and signup
      email: '',
      password: '',
      user_name: '',
      rating: null,
      show: true,
      errorText : ''
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  };

  handleClose() {
    this.setState({ show:false });
  };

  handleShow() {
    this.setState({ show:true });
  };

  handleLogin(mutation, e){
    e.preventDefault();
    if (this.state.login){
      if (this.state.email !== '' && this.state.password !== '') {
        mutation()
          .then((response) => {
            this.setState({
              rating: response.data.login.user.rating
            },
            () => {console.log(response)}
            )
          })
          .catch((err) => {
            console.log('error', err);
            this.setState({
              errorText: err.message
            })
          })
      }
    }
    else {
      if (this.state.email !== '' && this.state.password !== '' && this.state.user_name !== '') {
        mutation()
      }
    }
  };

  render() {
    if (!this.state.show) {
      return <Redirect to={{
                pathname: '/',
                state: {}
              }} />;
    };
    const { login, email, password, user_name } = this.state
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{login ? 'Login' : 'Sign Up'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {!login && (
                <Form.Group controlId="formBasicUserName">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter User Name" onChange={e => this.setState({ user_name: e.target.value })} value={user_name} />
                </Form.Group>
              )}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" onChange={e => this.setState({ email: e.target.value })} value={email} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" onChange={e => this.setState({ password: e.target.value })} value={password} />
            </Form.Group>
            <Form.Group id="formBasicChecbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            {this.state.errorText && (
              <Alert variant="warning">
                {this.state.errorText}
              </Alert>
            )}
            <Mutation
                mutation={login ? loginQuery : signupQuery}
                variables={{ email, password, user_name }}
                onCompleted={(data) => this._confirm(data)}>
                {mutation => (
                  <Button type="submit" onClick={(e) => this.handleLogin(mutation, e)}>
                    {login ? 'Login' : 'Create Account'}
                  </Button>
                )}
              </Mutation>
              <div
                className="pointer button"
                onClick={() => this.setState({ login: !login, errorText: '' })}
              >
                {login ? 'Need to create an account?' : 'Already have an account?'}
              </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup;
    await this._saveUserData(token);
    this.props.toggleLogin();

    if (!this.state.login) { this.props.history.push(`/profilePage`) }
    else { this.props.history.push(`/`) }
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
};

export default withRouter(Login);
