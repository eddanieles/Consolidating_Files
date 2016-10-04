import React, {Component} from 'react'
import base from '../config/base'

class TotalExpenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myExpenses: [
                ['Expense Category', 'Monthly Cost'],
                ['placeholder', 0]
            ],
            income: 0
        }
    }
    componentDidMount() {
        this.rebaseRef = base.syncState(`${localStorage.UID}/myExpenses`, {
            context: this,
            state: 'myExpenses',
            asArray: true
        });
        this.rebaseRef = base.syncState(`${localStorage.UID}/Income`, {
            context: this,
            state: 'income'
        });
    }
    componentWillUnmount() {
        base.removeBinding(this.rebaseRef);
    }
    render() {
        let runningTotalExpenses = this.state.myExpenses.slice(1, this.state.myExpenses.length).map(expense => expense[1]).reduce((total, current) => total + current);
        let surplus = this.state.income - runningTotalExpenses;
        return (
            <footer className="col-sm-9 col-sm-offset-1">
                <p>Income:
                    <span>
                        { " $" + this.state.income}
                    </span>
                </p>
                <p>Total Expenses:
                    <span>
                        { " $" + runningTotalExpenses}
                    </span>
                </p>
                <p>Surplus:
                    <span>
                        {surplus < 0
                            ? " You don't make enough, Ass Hole!"
                            : " $" + surplus}
                    </span>
                </p>

            </footer>

        )
    }
}

export default TotalExpenses;
