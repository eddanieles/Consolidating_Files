import React, { Component } from 'react';
import './App.css';
import ExpenseCategories from './components/ExpenseCategories';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ExpenseCategories />
      </div>
    );
  }
}

export default App;
