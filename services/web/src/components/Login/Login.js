import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../../constants';
import { Mutation } from 'react-apollo';
import { signupQuery, loginQuery } from '../../queries/queriesUser';
import { Modal, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import './Login.css';

class Login extends Component {
  state = {
    login: true, // swith between login and signup
    email: '',
    password: '',
    user_name: '',
    show: true,
    errorText : ''
  };

  handleClose = () => {
    this.setState({ show:false });
  };

  handleShow = ()  => {
    this.setState({ show:true });
  };

  handleStateChange = (e) => {

    this.setState({ 
      [e.target.name] : e.target.value,
      errorText : ''
     })
  }

  handleLogin = (mutation, e) => {
    e.preventDefault();
    if (this.state.login){
      if (this.state.email !== '' && this.state.password !== '') {
        mutation()
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log('error', err);
            let errorText = "";
            if(err.message === "GraphQL error: No such user found")
            {
              errorText = "No such user found"
            } else {
              errorText = err.message;
            }
            this.setState({
              errorText: errorText
            })
          })
      } else {
        //please enter email and password
        this.setState({
          errorText: 'Please enter email and password'
        })

      }
    }
    else {
      if (this.state.email !== '' && this.state.password !== '' && this.state.user_name !== '') {
        mutation()
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log('error', err);
          let errorText = "";
          if(err.message === "GraphQL error: A unique constraint would be violated on User. Details: Field name = email")
          {
            errorText = "Email already exists"
          } else {
            errorText = err.message;
          }
          this.setState({
            errorText: errorText
          })
        })
      } else {
        //please enter email and password and username
        this.setState({
          errorText: 'Please enter user name, email and password.'
        })
      }
    }
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
        <Modal.Header closeButton className="modelHeader">
          <Modal.Title className="modelTitle">{login ? 'Login' : 'Sign Up'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {!login && (
                <Form.Group controlId="formBasicUserName">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter User Name" name="user_name" onChange={e => this.handleStateChange(e) } value={user_name} />
                </Form.Group>
              )}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" name="email" onChange={e => this.handleStateChange(e)} value={email} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" name="password" onChange={e => this.handleStateChange(e)} value={password} />
            </Form.Group>
            <Form.Group id="formBasicChecbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            {this.state.errorText && (
              <Alert variant="warning">
                {this.state.errorText}
              </Alert>
            )}
            <Form.Group className="centered">
              <Mutation
                  mutation={login ? loginQuery : signupQuery}
                  variables={{ email, password, user_name }}
                  onCompleted={(data) => this._confirm(data)}>
                  {mutation => (
                    <Button type="submit" id="noticeBtn" onClick={(e) => this.handleLogin(mutation, e)}>
                      {login ? 'Login' : 'Create Account'}
                    </Button>
                  )}
                </Mutation>
            </Form.Group>
          </Form>
          <Row>
              <Col className="centered">
                <a className="footerLink" href='' onClick={(e) => {
                  e.preventDefault();
                  this.setState({ login: !login, errorText: '' });
                }}
                >
                  {login ? 'Need to create an account?' : 'Already have an account?'}
                </a>
              </Col>
          </Row> 
        </Modal.Body>
      </Modal>
    );
  };

};

export default withRouter(Login);
