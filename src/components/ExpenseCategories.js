import React, { Component } from 'react'
import base from '../config/base'

class ExpenseCategories extends Component{
  constructor(props){
    super(props);
    this.state = {
      categories: [
        ['Food', 0],
        ['Fun', 10],
        ['Housing', 20],
        ['Loans', 30],
        ['Miscellaneous', 40],
        ['Transportation', 50],
        ['Utilities', 60]
        ],
      myArray: []
  //TSCI = {name: 'Utilities',value: 60}
  //TSCI => {name: 'Utilities',value: 37}
    }
  }
  handleChange(expense, index, event){
    //console.log(expense.name + ", " + event.target.value);
    //console.log(expense.value);
    //console.log(index + ", " + this.state.categories[index].value);
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
              <span>{expense[0]}</span>
              <input type='range' min={0} max={100} step={5} onChange={this.handleChange.bind(this, expense, index)}/>
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
