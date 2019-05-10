import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  // DONE******* add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server

  componentDidMount() {
    axios.get('http://localhost:3333/smurfs')
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log(err))
  }


  // Notice what your map function is looping over and returning inside of Smurfs.

  addSmurf = (smurf) => {
    axios.post('http://localhost:3333/smurfs', smurf)
      .then(res => this.setState({ smurfs: res.data }))
      .catch(error => console.log(error))
  }

  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <button><NavLink to={'/'} exact activeClassName='current'>Smurfs</NavLink></button>
        <NavLink to={'/smurf-form'} activeClassName='current'><button>Add Smurf Form</button></NavLink>
        <Route exact path={'/'} render={props => <Smurfs smurfs={this.state.smurfs} {...props} />} />
        <Route path={'/smurf-form'} render={props => <SmurfForm addSmurf={this.addSmurf} {...props} />} />
      </div>
    );
  }
}

export default App;
