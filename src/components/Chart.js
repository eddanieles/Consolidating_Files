import React, { Component } from 'react'
import base from '../config/base'
import {Chart} from 'react-google-charts'

class PieChart extends Component{
  constructor(props){
    super(props);
    this.state = {
      categories: [
        ['My Expenses', 'Value'],
        ['placeholder', 0]
        ],
      options: {
        backgroundColor: 'none',
        is3D: true,
        legend: {textStyle: {color: 'red'}},
        titleTextStyle: {color: 'red'}
      }
    }
  }
  componentDidMount() {
      this.ref = base.syncState(`${localStorage.UID}/myExpenses`, {
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
    return (
      <div>
        <Chart chartType="PieChart" data={this.state.categories} options={this.state.options} width={"100%"} height={"400px"} legend_toggle={true} />
      </div>
    )
  }
}

export default PieChart;
