import React, {Component} from 'react';
import {AddForm, ExpenseItem, MonthSelector} from "../components";
import {connect} from "react-redux";
import {fetchExpenses} from "../actions";
import {Spinner, Table} from "reactstrap";
import moment from "moment";

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: moment().month()
        }
    }

    onSelectMonth(month) {
        this.setState(() => {
            return {
                selected: month
            }
        });
        this.getExpenses(month);
    }

    componentDidMount() {
        this.getExpenses();
    }

    getExpenses(month){
        const {fetchExpenses} = this.props;
        fetchExpenses(month);
    }

    render() {
        const {fetching, expenses} = this.props;
        if (fetching) {
            return (
                <div className="container text-center">
                    <Spinner color='dark' style={{
                        width: '4rem',
                        height: '4rem'
                    }}/>{' '}
                </div>
            )
        }
        return (
            <div>
                <MonthSelector selected={this.state.selected} onSelectMonth={this.onSelectMonth.bind(this)}/>
                <h3>Your Expenses</h3>
                <hr/>
                <Table responsive bordered hover striped>
                    <thead>
                    <tr className='text-center'>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody className='text-center'>
                    {
                        expenses.map((item) => (
                            <ExpenseItem item={item} key={item.id}/>
                        ))
                    }
                    </tbody>
                </Table>
                <AddForm/>
            </div>
        );
    }
}

const mapStateToProps = ({expense}) => {
    return {
        fetching: expense.fetching,
        expenses: expense.expenses
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchExpenses: (month) => dispatch(fetchExpenses(month))
    }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export {Home};