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
        var styles = {
            total: {
                flexGrow: 1,
                fontWeight: "bold",
                height: "100%",
                textAlign: "center",
                backgroundColor: "#A4A5A9",
                borderRadius: "5px",
                margin: "10px"
            },
            footer: {
                display: "inline-flex",
                position: "absolute",
                bottom: "10",
                height: "60px",
                backgroundColor: "transparent",
                borderRadius: "5px"
            }
        }
        return (
            <footer className="col-sm-9 col-sm-offset-1" style={styles.footer}>
                <p style={styles.total}>Income:
                    <span>
                        { " $" + this.state.income}
                    </span>
                </p>
                <p style={styles.total}>Total Expenses:
                    <span>
                        { " $" + runningTotalExpenses}
                    </span>
                </p>
                <p style={styles.total}>Surplus:
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
