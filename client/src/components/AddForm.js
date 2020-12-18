import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Label} from 'reactstrap';
import {connect} from "react-redux";
import {FloatButton} from "./FloatButton";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

const initialValues = {email: '', password: ''};
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address!').required('Email address is required!'),
    password: Yup.string().required('Password is required!')
});
class AddFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    onSubmit = (values, actions) =>{
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
                                (formik) =>{
                                    const {errors, touched, isValid, dirty, isSubmitting} = formik;
                                    return (
                                        <Form>
                                            <div className="form-group">
                                                <Label for="email">Email</Label>
                                                <Field className={errors.email && touched.email ? 'form-control is-invalid' : 'form-control'} name="email" id="email" placeholder="someone@mail.com" />
                                                <ErrorMessage name="email" component="span" className="text-danger"/>
                                            </div>
                                            <div className="form-group">
                                                <Label for="password">Password</Label>
                                                <Field className={errors.password && touched.password ? 'form-control is-invalid' : 'form-control'} type="password" name="password" id="password" placeholder="Your Password" />
                                                <ErrorMessage name="password" component="span" className="text-danger"/>
                                            </div>
                                        </Form>
                                    );
                                }
                            }
                        </Formik>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Save</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const AddForm = connect()(AddFormComponent);
export {AddForm} ;