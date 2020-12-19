import React, {Component} from 'react';
import {Button, Label, Modal, ModalBody, ModalHeader} from 'reactstrap';
import {connect} from "react-redux";
import {FloatButton} from "./FloatButton";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import moment from "moment";


const now = moment().format('YYYY-MM-DD');
const initialValues = {amount: '', created: now};
const validationSchema = Yup.object({
    amount: Yup.number().min(1).integer().required('Please enter the expense amount!'),
    created: Yup.date().required('Please enter the expense date!')
});

class AddFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    onSubmit = (values, actions) => {
        console.log(values);
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
                        <Formik
                            initialValues={initialValues}
                            onSubmit={this.onSubmit}
                            validationSchema={validationSchema}>
                            {
                                (formik) => {
                                    const {errors, touched, isValid, dirty, isSubmitting} = formik;
                                    return (
                                        <Form>
                                            <div className="form-group">
                                                <Label for="amount">Amount</Label>
                                                <Field
                                                    className={errors.amount && touched.amount ? 'form-control is-invalid' : 'form-control'}
                                                    name="amount" type="number" id="amount"
                                                    placeholder="Enter Expense Amount"/>
                                                <ErrorMessage name="amount" component="span" className="text-danger"/>
                                            </div>
                                            <div className="form-group">
                                                <Label for="created">Created</Label>
                                                <Field
                                                    className={errors.created && touched.created ? 'form-control is-invalid' : 'form-control'}
                                                    type="date" name="created" id="created"
                                                    placeholder="Enter Expense Date"/>
                                                <ErrorMessage name="created" component="span" className="text-danger"/>
                                            </div>
                                            <hr/>
                                            <div className="form-group">
                                                <Button color="primary" type="submit" disabled={!(dirty && isValid) || isSubmitting}>Save Expense</Button>
                                            </div>
                                        </Form>
                                    );
                                }
                            }
                        </Formik>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const AddForm = connect()(AddFormComponent);
export {AddForm} ;