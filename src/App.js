import React, { Component } from 'react';
import './App.css';
import ExpenseCategories from './components/ExpenseCategories';
import PieChart from './components/Chart'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PieChart />
        <ExpenseCategories />
      </div>
    );
  }
}

export default App;
