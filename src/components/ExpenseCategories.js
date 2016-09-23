import React, { Component } from 'react'
import base from '../config/base'

class ExpenseCategories extends Component{
  constructor(props){
    super(props);
    this.state = {
      categories: [
        ['My Expenses', 'Value'],
        ['Food', 0],
        ['Fun', 10],
        ['Housing', 20],
        ['Loans', 30],
        ['Miscellaneous', 40],
        ['Transportation', 50],
        ['Utilities', 60]
        ],
      myArray: []
    }
  }
  handleChange(expense, index, event){
    let newArray = this.state.categories.map((item, index) => {
        if (item[0] === expense[0]){
          return  [expense[0], parseInt(event.target.value, 10)];
        } else {
          return item;
        }
      }
    );
    this.setState({categories: newArray });
    console.log(this.state.categories[index][1]);
  }
  componentDidMount() {
      this.ref = base.syncState(`${localStorage.UID}/test`, {
        context: this,
        state: 'categories',
        asArray: true
      })
      // base.update(`${localStorage.UID}/test`, {
      //   data: this.state.categories
      // });
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
        {this.state.categories.slice(1, this.state.categories.length).map((expense, index) =>
            <div className="expenses" key={index}>
              <p>
                <span>{expense[0]}</span>
                <input type='range' min={0} max={100} step={5} value={expense[1]} onChange={this.handleChange.bind(this, expense, index)}/>
                <span>{expense[1]}</span>
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
