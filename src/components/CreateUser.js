import React, { Component } from 'react';
import base from '../config/base';

class CreateUser extends Component {

  constructor (props) {
    super(props);
    this.createUser = this.createUser.bind(this);
    this.handleCreatedUser = this.handleCreatedUser.bind(this);
  }
  createUser (event) {
    event.preventDefault();
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    console.log('in createUser method of CreateUser component')
    base.createUser({
      email, password
    }, this.handleCreatedUser);
  }
  // the knowledge to use 2 parameters here
  // came from searching for createUser in the re-base repo
  // https://github.com/tylermcginnis/re-base/blob/a96bd8c9909a6e48d83f18bdb5b93c3e1efe1529/tests/specs/re-base.spec.js
  handleCreatedUser (error, authData) {
    console.log('in handleCreatedUser method; auth data is', authData);
    console.log('uid: ', authData.uid);
    this.props.setCurrentUser(authData);
  }

  render () {
    return (
      <form onSubmit={this.createUser}>
        <legend>Create Account</legend>
        <input type="text" ref="email" placeholder="Email Address"/>
        <input type="password" ref="password" placeholder="Password"/>
        <button type="submit">Create</button>
      </form>
    )
  }
}
export default CreateUser;
