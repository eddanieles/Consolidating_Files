import React, { Component } from 'react';
import Dashboard from './Dashboard'
// import TotalExpenses from './TotalExpenses'
import moment from 'moment';
import 'moment-range';
import {Chart} from 'react-google-charts'
import base from '../config/base'

class Goals extends Component{
  constructor(){
    super()
    this.state ={
      goal: 5000,
      start: moment().format('YYYY-MM-DD'),
      end: moment().format('YYYY-MM-DD'),
      days: "",
      weeks: "",
      months: "",
      lineData: [['Month', 'Projected', 'Actual'],['placeholder month', 1000, 800]],
      areaOptions: {
          title: 'Projected Savings v Actual Savings',
          hAxis: {title: 'Month', textStyle: {color: 'white'}},
          vAxis: {textStyle: {color: 'white'}},
          backgroundColor: 'none',
        }
    }
  }
  handleChange(event) {
      this.setState({
          goal: parseInt(event.target.value, 10)
      });

      var dateStart = moment(this.refs.start.value);
      var dateEnd = moment(this.state.end);
      var timeValues = [['Month', 'Projected', 'Actual']];
      var i = 0;
      let months = moment.range(dateStart, dateEnd).diff('months');
      let monthlySavings = parseInt(event.target.value, 10) / months;
      while (dateEnd >= dateStart) {
        timeValues.push([dateStart.format('MMM YYYY'),  monthlySavings * i, 0]);
        dateStart.add(1,'month');
        i += 1;
        //console.log(timeValues);
      }
      this.setState({lineData: timeValues})
  }
  handleStart(e){
    //console.log(this.refs.start.value);
    let startDate = this.refs.start.value;
    this.setState({
      start: startDate,
    })

    var dateStart = moment(this.refs.start.value);
    var dateEnd = moment(this.state.end);
    var timeValues = [['Month', 'Projected', 'Actual']];
    var i = 0;
    let months = moment.range(dateStart, dateEnd).diff('months');
    let monthlySavings = this.state.goal / months;
    while (dateEnd >= dateStart) {
      timeValues.push([dateStart.format('MMM YYYY'),  monthlySavings * i, 0]);
      dateStart.add(1,'month');
      i += 1;
      //console.log(timeValues);
    }
    this.setState({lineData: timeValues})

    var start = moment(this.refs.start.value, "YYYY-MM-DD");
    var end   = moment(this.state.end, "YYYY-MM-DD");
    var range = moment.range(start, end);
    this.setState({
      days: range.diff('days'),
      weeks: range.diff('weeks'),
      months: range.diff('months'),

    })
  }
  handleEnd(e){

    //console.log(this.refs.end.value);
    let endDate = this.refs.end.value;
    this.setState({
      end: endDate,
    })

    var dateStart = moment(this.state.start);
    var dateEnd = moment(this.refs.end.value);
    var timeValues = [['Month', 'Projected', 'Actual']];
    var i = 0;
    let months = moment.range(dateStart, dateEnd).diff('months');
    let monthlySavings = this.state.goal / months;
    while (dateEnd >= dateStart) {
      timeValues.push([dateStart.format('MMM YYYY'),  monthlySavings * i, 0]);
      dateStart.add(1,'month');
      i += 1;
      //console.log(timeValues);
    }
    this.setState({lineData: timeValues})

    var start = moment(this.state.start, "YYYY-MM-DD");
    var end   = moment(this.refs.end.value, "YYYY-MM-DD");
    var range = moment.range(start, end);
    this.setState({
      days: range.diff('days'),
      weeks: range.diff('weeks'),
      months: range.diff('months'),

    })

  }
  handleInput(point, event){
    event.preventDefault();
    let newArray = this.state.lineData.map((item, index) => {
        if (item[0] === point[0]){
          return  [point[0], point[1], parseInt(event.target.value, 10)];
        } else {
          return item;
        }
      }
    );
    //console.log(newArray);
    this.setState({lineData: newArray });
  }
  componentDidMount() {
    this.ref = base.syncState(`${localStorage.UID}/myGoals/months`, {
      context: this,
      state: 'lineData',
      asArray: true
    });
    this.ref2 = base.syncState(`${localStorage.UID}/myGoals/start`, {
      context: this,
      state: 'start'
    });
    this.ref3 = base.syncState(`${localStorage.UID}/myGoals/end`, {
      context: this,
      state: 'end'
    });
    this.ref4 = base.syncState(`${localStorage.UID}/myGoals/goal`, {
      context: this,
      state: 'goal'
    });

   }
  componentWillUnmount(){
    base.removeBinding(this.ref);
    base.removeBinding(this.ref2);
    base.removeBinding(this.ref3);
    base.removeBinding(this.ref4);
  }
  render(){
    let days = moment.range(moment(this.state.start, "YYYY-MM-DD"), moment(this.state.end, "YYYY-MM-DD")).diff('days');
    let weeks = moment.range(moment(this.state.start, "YYYY-MM-DD"), moment(this.state.end, "YYYY-MM-DD")).diff('weeks');
    let months = moment.range(moment(this.state.start, "YYYY-MM-DD"), moment(this.state.end, "YYYY-MM-DD")).diff('months')
    let dailySavings = this.state.goal / days;
    let weeklySavings = this.state.goal / weeks;
    let monthlySavings = this.state.goal / months;
    return(
      <div>
        <Dashboard />
          <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h3 >Goal: ${this.state.goal}</h3>
            <input id="toggle" type='range' min={0} max={9999} step={5} value={this.state.goal} ref="goal" onChange={this.handleChange.bind(this)}/>

            <p>Select Start Date: <input type="date" value={this.state.start} ref="start" onChange={this.handleStart.bind(this)}/></p>
            <p>Select End Date: <input type="date" value={this.state.end} ref="end" onChange={this.handleEnd.bind(this)}/></p>
            <p >{ dailySavings === Infinity ? null : "days:" + days + " $" + Math.floor(dailySavings)}</p>
            <p >{ weeklySavings === Infinity ? null: "weeks:" + weeks + " $" + Math.floor(weeklySavings)}</p>
            <p >{ monthlySavings === Infinity ? null: "months:" + months + " $" + Math.floor(monthlySavings)}</p>

              <Chart chartType="AreaChart" data={this.state.lineData} options={this.state.areaOptions} width={"45%"} height={"400px"}/>
              {this.state.lineData.slice(1, this.state.lineData.length).map((point, index) =>
                <div key={index} >
                  <h4>{point[0]}</h4>
                  <p>Projected: {Math.ceil(point[1])}</p>
                  <p><input type="range" value={point[2]} min={0} max={this.state.goal + 500} onChange={this.handleInput.bind(this, point)}/></p>
                  <p>Actual: {point[2]}</p>
                </div>)}
          </div>


      </div>
    )
  }
}


export default Goals;
