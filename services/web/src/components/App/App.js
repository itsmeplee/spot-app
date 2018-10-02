import React, { Component } from 'react';
import './App.css';
import Login from '../Login/Login.js';
import AddSpot from '../AddSpot/AddSpot.js';
import LocationList from '../LocationList/LocationList.js';
import CarList from '../CarList/CarList.js';
import NavBar from '../NavBar/NavBar.js';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import SpotsList from '../SpotsList/SpotsList';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',            //NEED TO CONFIGURE WIHT DOCKER-COMPOSE
  connectToDevTools: true
})

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_id: "1",
      
    }
  }

  render() {
    return (
      <ApolloProvider client={client} >
        <div className="App">
          <br/>
          <br/>
          <br/>
          <NavBar />
          <Login />
          <AddSpot user_id={this.state.user_id}/>
          <SpotsList />
          <LocationList user_id={this.state.user_id}/>
          <CarList user_id={this.state.user_id}/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
