import React, {Component} from 'react';
import moment from "moment";

const MONTHS = moment.months();
class MonthSelector extends Component {

    handleChangingMonth = (e) =>{
        const selectedMonth = e.target.value;
        const {onSelectMonth} = this.props;
        onSelectMonth(selectedMonth);
    }
    render() {
        const {selected} = this.props;
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="month">Select Month</label>
                    <select name="month" id="month" className="form-control" value={selected} onChange={this.handleChangingMonth.bind(this)}>
                        {MONTHS.map((month, index) =>{
                            return <option value={index} key={index}>{month}</option>
                        })}
                    </select>
                </div>
                <hr/>
            </div>
        );
    }
}

export {MonthSelector};