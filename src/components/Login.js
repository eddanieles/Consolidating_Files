import React, { Component } from 'react';
import { Link } from 'react-router';
import base from '../config/base.js';

class Login extends Component {
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  login(event){
    event.preventDefault();
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    base.authWithPassword({
      email,
      password
    }, this.authUser.bind(this));
  }
  navigate(error, authData){
    console.log("Error:", error);
    console.log(authData);
    this.props.history.replaceState(null, "/home/${localStorage.UID}");
  }
  handleClick(event){
    event.preventDefault();
    base.authWithOAuthPopup('github', this.authUser.bind(this));
  }
  authUser(error, authData){
    console.log(error);
    console.log("authData: " + authData.uid);
    localStorage.setItem('UID', authData.uid);
    this.props.history.replaceState(null, `/home/${authData.uid}`);
  }
  render(){
    return(
      <form onSubmit={this.login}>
        <h1>Please Login</h1>
        <p><input type="text" ref="email" placeholder="Email Address"/></p>
        <p><input type="password" ref="password" placeholder="Password" /></p>
        <p><button type="submit">Login</button></p>
        <p><button type="submit" onClick={this.handleClick}>SignIn with Github</button></p>
        <p>New User? <Link to="/register">Register Here</Link></p>
      </form>
    );
  }
}

export default Login
