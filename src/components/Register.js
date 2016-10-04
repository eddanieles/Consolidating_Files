import React, { Component } from 'react';
import { Link } from 'react-router';
import base from '../config/base.js';
import moment from 'moment';

class Register extends Component {
  constructor(props){
    super(props);
    this.register = this.register.bind(this);
    this.createUser = this.createUser.bind(this);
  }
  register(event){
    event.preventDefault();
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    base.createUser({
      email: email,
      password: password
    }, this.createUser);
  }
  createUser(error, authData) {
    //console.log(authData.uid);
      localStorage.setItem('UID', authData.uid);
       base.update(`${authData.uid}`, {
         data: {'Income': 5000}
       });
       base.update(`${authData.uid}/myExpenses`, {
         data: {0: {0:'Expense Category', 1:'Monthly Cost'},
                1: {0:'Food', 1:0},
                2: {0:'Fun', 1:0},
                3: {0:'Housing', 1:0},
                4: {0:'Loans', 1:0},
                5: {0:'Miscellaneous', 1:0},
                6: {0:'Transportation', 1:0},
                7: {0:'Utilities', 1:0}}
       });
       base.update(`${authData.uid}/myFood`, {
         data: {0: {'name':'Groceries', 'value':0},
                1: {'name':'Going Out', 'value':0}}
       });
       base.update(`${authData.uid}/myFun`, {
         data: {0: {'name':'Hobbies', 'value':0},
                1: {'name':'Entertainment', 'value':0}}
       });
       base.update(`${authData.uid}/myHousing`, {
         data: {0: {'name':'Rent', 'value':0},
                1: {'name':'Mortgage', 'value':0},
                2: {'name':'Renovation and Maintenance', 'value':0}}
       });
       base.update(`${authData.uid}/myLoans`, {
         data: {0: {'interestTotal':0, 'monthlyPayment':0, 'months':1, 'principal': 0, 'rate': 0.1, 'type': 'Auto'},
                1: {'interestTotal':0, 'monthlyPayment':0, 'months':1, 'principal': 0, 'rate': 0.1, 'type': 'Student'},
                2: {'interestTotal':0, 'monthlyPayment':0, 'months':1, 'principal': 0, 'rate': 0.1, 'type': 'Personal'},
                3: {'interestTotal':0, 'monthlyPayment':0, 'months':1, 'principal': 0, 'rate': 0.1, 'type': 'Miscellaneous'}}
       });
       base.update(`${authData.uid}/myMiscellaneous`, {
         data: {0: {'name':'Family', 'value':0},
                1: {'name':'Clothes', 'value':0},
                2: {'name':'Personal Amentities', 'value':0},
                3: {'name':'Health and Fitness', 'value':0}}
       });
       base.update(`${authData.uid}/myTransportation`, {
         data: {0: {'name':'Gas', 'value':0},
                1: {'name':'Insurance', 'value':0},
                2: {'name':'Public', 'value':0}}
       });
       base.update(`${authData.uid}/myUtilities`, {
         data: {0: {'name':'Phone', 'value':0},
                1: {'name':'Cable and Internet', 'value':0},
                2: {'name':'Electric', 'value':0},
                3: {'name':'Water and Trash', 'value':0},
                4: {'name':'Gas', 'value':0}}
       });
       base.update(`${authData.uid}/myGoals`, {
         data: {'goal': 5000,
                'months': {0: {0:'Monthly', 1:'Projected', 2:'Actual'},
                          1: {0:'placeholder month', 1:0, 2:0}},
                'start': moment().format('YYYY-MM-DD'),
                'end': moment().format('YYYY-MM-DD')}
       });
       this.props.history.replaceState(null, `/home/${authData.uid}`);
   }

  render(){
    return(
      <form onSubmit={this.register}>
        <h1>Registration Page</h1>
        <p><input type="text" ref="email" placeholder="Email Address"/></p>
        <p><input type="password" ref="password" placeholder="Password" /></p>
        <p><button type="submit">Register</button></p>
        <p>Already A User? <Link to="/">SignIn Here</Link></p>
      </form>
    );
  }
}

export default Register
