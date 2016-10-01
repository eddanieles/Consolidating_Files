import React, { Component } from 'react'
import base from '../config/base'

class ExpenseCategories extends Component{
  constructor(props){
    super(props);
    this.state = {
      categories: [
        ['Expense Category', 'Monthly Cost'],
        ['placeholder', 0]
        ]
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
    //console.log(this.state.categories[index+1][1]);
  }
  componentDidMount() {
      this.ref = base.syncState(`Ntni90WRyNRwzN11CkhEfjDPITw1/myExpenses`, {
        context: this,
        state: 'categories',
        asArray: true
      })
      // base.update(`${localStorage.UID}/myExpenses`, {
      //   data: this.state.categories
      // });
   }
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }
  render () {
    let display = this.state.categories.slice(1, this.state.categories.length).map((expense, index) => {
      if (expense[0] === 'Housing') {
        return <div className="expenses" key={index}>
                  <p>
                    <span>{expense[0]}</span>
                    <input type='range' min={0} max={2000} step={5} value={expense[1]} onChange={this.handleChange.bind(this, expense, index)}/>
                    <span>{expense[1]}</span>
                  </p>
                </div>
      }else {
        return <div className="expenses" key={index}>
                  <p>
                    <span>{expense[0]}</span>
                    <input type='range' min={0} max={1000} step={5} value={expense[1]} onChange={this.handleChange.bind(this, expense, index)}/>
                    <span>{expense[1]}</span>
                  </p>
                </div>
      }
    })
    return (
      <div>
        {display}
      </div>
    )
  }
}

export default ExpenseCategories;
