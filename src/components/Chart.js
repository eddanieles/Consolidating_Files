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
      pieOptions: {
        backgroundColor: 'none',
        is3D: true,
        legend: {textStyle: {color: 'red'}},
        titleTextStyle: {color: 'red'}
      },
      barOptions: {
        legend: {position: 'none'}
      },
      lineData: [
          ['Month', 'Projected', 'Actual'],
          ['October',  300, 0],
          ['November',  600, 0],
          ['December',  900, 0],
          ['January',  1200, 0]
        ],
      areaOptions: {
          title: 'Savings Tracker',
          hAxis: {title: 'Month',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0}
        }
    }
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
    return (
      <div style={{display: 'inline-flex', width: '100%'}}>
        <Chart chartType="Bar" data={this.state.categories} options={this.state.barOptions} width={"45%"} height={"400px"}/>
        <Chart chartType="PieChart" data={this.state.categories} options={this.state.pieOptions} width={"45%"} height={"400px"} legend_toggle={true} />
        <Chart chartType="AreaChart" data={this.state.lineData} options={this.state.areaOptions} width={"45%"} height={"400px"}/>
      </div>
    )
  }
}

export default PieChart;
