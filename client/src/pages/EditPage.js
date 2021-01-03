import React, {Component} from 'react';
import {FormBody} from "../components";
import {connect} from "react-redux";
import {resetSavedFlag, updateExpense} from "../actions";

class EditPage extends Component {

    componentDidUpdate() {
        const {updated, resetSavedFlag} = this.props;
        if(updated){
            resetSavedFlag();
            this.props.history.push('/');
        }
    }

    onSubmit = (values, actions) => {
        const expenseId = this.props.location.state.item.id;
        this.props.updateExpense(expenseId, values);
        this.actions = actions;
    }

    render() {
        let item;
        try {
            item = this.props.location.state.item;
        } catch (e) {
            console.error(e);
            item = undefined;
        }
        if (!item) {
            this.props.history.push('/');
        }
        return (
            <div>
                <h3>Edit Expense</h3>
                <hr/>
                <FormBody expense={item} btnText={'Update Expense'} onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

const mapStateToProps = ({expense}) => {
    return {
        updated: expense.updated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateExpense: (id, values) => dispatch(updateExpense(id, values)),
        resetSavedFlag: () => dispatch(resetSavedFlag())
    }
}

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditPage);
export {Edit};