import React, { Component } from 'react'
import Food from '../expenseCategories/Food'
import Fun from '../expenseCategories/Fun'
import Housing from '../expenseCategories/Housing'
import Loans from '../expenseCategories/Loans'
import Miscellaneous from '../expenseCategories/Miscellaneous'
import Transportation from '../expenseCategories/Transportation'
import Utilities from '../expenseCategories/Utilities'

class Expenses extends Component{
  render () {
    return (
      <div style={{display: "flex", flexWrap: "wrap"}}>
        <Food />
        <Fun />
        <Housing/>
        <Loans/>
        <Miscellaneous/>
        <Transportation/>
        <Utilities/>
      </div>
    )
  }
}

export default Expenses;
