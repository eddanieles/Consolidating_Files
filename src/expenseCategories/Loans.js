import React, { Component } from 'react'
import base from '../config/base'
import $ from 'jquery'

class Loans extends Component {
  constructor(props){
    super(props);
    this.state = {
      subs: [],
      total: 10
    }
  }
  componentDidMount() {
      this.ref = base.syncState(`${localStorage.UID}/myLoans`, {
          context: this,
          state: 'subs',
          asArray: true
      });
      this.ref2 = base.syncState(`${localStorage.UID}/myExpenses/4/1`, {
          context: this,
          state: 'total'
      });
      // base.update(`${localStorage.UID}/myLoans`, {
      //   data: this.state.loans
      // });
    }
    componentWillUnmount() {
      base.removeBinding(this.ref);
      base.removeBinding(this.ref2);
    }
    handleClick(event){
      $('.loans').toggle('slow')
    }
  render(){
    return (
      <div style={{border: "1px solid black", minWidth: "40%", margin: "5px"}}>
        <div onClick={this.handleClick.bind(this)}>
          <p>Loans</p>
          <p>${this.state.total}</p>
        </div>
        {this.state.subs.map((loan, index) =>
          <div className="expenses loans" key={index}>
            <p>{loan.type}:</p>
            <p>{loan.monthlyPayment}</p>
          </div>)}
          <p className="loans" style={{display: "none"}}>(Please see loans page)</p>
      </div>
    )
  }
}

export default Loans


// <div>
//   {this.state.subs.map((expense, index) =>
//     <div className="expenses food" key={index} >
//       <p>
//         <span>{expense.name}:</span>
//         <input type='range' value={expense.value} min={0} max={1000} step={5} onChange={this.handleChange.bind(this, expense, index)}/>
//         <span>{expense.value}</span>
//       </p>
//     </div>
