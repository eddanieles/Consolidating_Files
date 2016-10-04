import React, {Component} from 'react'
import base from '../config/base'
import $ from 'jquery'

class Income extends Component {
    constructor(props) {
        super(props);
        this.state = {
            income: 5000,
            text: '',
            showSlider: false,
        }
    }
    handleChange(event) {
        this.setState({
            income: parseInt(event.target.value, 10)
        });
    }
    onClick(e) {
      console.log("im trying");
        this.setState({
            sliderShow: !this.state.showSlider,
        });
        $('#toggle').toggle(this.state.showSlider.show)
    }
componentDidMount() {
    this.rebaseRef = base.syncState(`${localStorage.UID}/Income`, {
        context: this,
        state: 'income'
    });
}
componentWillUnmount() {
    base.removeBinding(this.rebaseRef);
}
render() {

    return (
        <div className="income">
            <div onClick={this.onClick.bind(this)}>
                <p>Income</p>
                <label>${this.state.income}</label>
                <i className="glyphicon glyphicon-usd"></i>
            </div>
            {this.state.sliderShow
                ? <input id="toggle" type='range' min={0} max={9999} step={5} value={this.state.income} onChange={this.handleChange.bind(this)}/>
                : null}

        </div>
    )
}
}

export default Income;
