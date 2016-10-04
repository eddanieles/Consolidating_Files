import React, { Component } from 'react'
import {Chart} from 'react-google-charts'
import base from '../config/base'

class PieChart extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [['Expense Category', 'Monthly Cost'],
      ['Food', 350],
      ['Fun', 800],
      ['Housing', 800],
      ['Loans', 450],
      ['Miscelleanous', 200],
      ['Transportation', 100],
      ['Utilities', 175]],
      pieOptions: {
        backgroundColor: 'none',
        is3D: true,
        legend: {textStyle: {color: 'black'}},
        titleTextStyle: {color: 'black'}
      },
      barOptions: {
        backgroundColor: 'none',
        legend: { position: 'none' }
      },
      myExpenses: []
    }
  }
  componentDidMount() {
    this.rebaseRef = base.syncState(`${localStorage.UID}/myExpenses`, {
      context: this,
      state: 'data',
      asArray: true
    });
  }
   componentWillUnmount(){
     base.removeBinding(this.rebaseRef);
   }
   handleClick(event){
     event.preventDefault();
     let expensesArray = this.state.myExpenses;
     this.setState({
         'data' : expensesArray
      });
    }
  render() {
    return (
      <div className={"my-pretty-chart-container"}>
        <Chart style={{minWidth:'45%'}} chartType="PieChart" data={this.state.data} options={this.state.pieOptions} width={"100%"} height={"400px"} legend_toggle={true} />
        <Chart chartType="BarChart" data={this.state.data} options={this.state.barOptions} width={"100%"} height={"400px"} />
      </div>
    )
  }
}

export default PieChart;
