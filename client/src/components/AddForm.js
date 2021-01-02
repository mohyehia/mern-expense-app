import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import {connect} from "react-redux";
import {FloatButton} from "./FloatButton";
import {fetchExpenses, resetSavedFlag, saveExpense} from "../actions";
import {FormBody} from "./FormBody";

class AddFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidUpdate() {
        const {saved, error, resetSavedFlag, fetchExpenses} = this.props;
        const {modal} = this.state;
        if (error && this.actions) {
            this.actions.setSubmitting(false);
        }
        if (saved && modal && this.actions) {
            resetSavedFlag();
            this.toggle();
            this.actions.resetForm();
            fetchExpenses();
        }
    }

    onSubmit = (values, actions) => {
        this.props.saveExpense(values);
        this.actions = actions;
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        return (
            <div>
                <FloatButton onClick={this.toggle}/>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Expense</ModalHeader>
                    <ModalBody>
                        <FormBody onSubmit={this.onSubmit} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        saved: state.expense.saved,
        error: state.errors.message
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveExpense: (values) => dispatch(saveExpense(values)),
        resetSavedFlag: () => dispatch(resetSavedFlag()),
        fetchExpenses: () => dispatch(fetchExpenses())
    }
}
const AddForm = connect(mapStateToProps, mapDispatchToProps)(AddFormComponent);
export {AddForm} ;