import React, { Component } from 'react';
import './App.css';
import ExpenseCategories from './components/ExpenseCategories';
import PieChart from './components/Chart'
import TotalExpenses from './components/TotalExpenses'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PieChart />
        <ExpenseCategories />
        <TotalExpenses />
      </div>
    );
  }
}

export default App;
