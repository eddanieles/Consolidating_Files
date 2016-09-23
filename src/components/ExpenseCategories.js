import React, { Component } from 'react'
import base from '../config/base'

class ExpenseCategories extends Component{
  constructor(props){
    super(props);
    this.state = {
      categories: ['Food', 'Fun', 'Housing', 'Loans', 'Miscellaneous', 'Transportation', 'Utilities'],
      food: 0,
      fun: 10,
      housing: 20,
      loans: 30,
      miscellaneous: 40,
      transportation: 50,
      utilities: 60,
      myArray: []

    }
  }
  handleChange(expense, event){
    this.setState({[expense]: parseInt(event.target.value, 10)});
  }
  componentDidMount() {
    this.state.categories.map((expense, index) =>
      this.ref = base.syncState(`${localStorage.UID}/myExpenses/${expense}/1`, {
        context: this,
        state: expense
      })
    )
   }
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }
  handleClick(event){
    let whatevs = this.state.myArray;
    let whatevsNumber = this.state.myArray.length;
    this.setState({myArray: whatevs.concat(whatevsNumber + 1)})
  }
  render () {
    return (
      <div>
        {this.state.categories.map((expense, index) =>
          <div className="expenses" key={index}>
            <p>
              <span>{expense}</span>
              <input type='range' min={0} max={100} step={5} onChange={this.handleChange.bind(this, expense)}/>
              <span>{this.state[expense]}</span>
            </p>
          </div>
        )}
        <button onClick={this.handleClick.bind(this)}>Click Me</button>
        {this.state.myArray}
      </div>
    )
  }
}

export default ExpenseCategories;
