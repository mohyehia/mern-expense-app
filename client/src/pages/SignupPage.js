import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Label} from "reactstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Link} from "react-router-dom";
import {signup} from "../actions/signup_action";
import {connect} from "react-redux";

const initialValues = {name: '', email: '', password: ''};
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required!'),
    email: Yup.string().email('Invalid email address!')
        .required('Email address is required!'),
    password: Yup.string()
        .min(6, 'Password must be greater than or equal to 6 characters')
        .required('Password is required!')
});

class SignupPage extends Component {
    componentDidUpdate() {
        const {created, error} = this.props;
        if (error && this.actions) {
            this.actions.setSubmitting(false);
        }
        if (created) {
            // redirect user to login page if his account created successfully
            this.props.history.push('/login');
        }
    }

    onSubmit = (values, actions) => {
        this.props.signup(values);
        this.actions = actions;
    }

    renderError = () => {
        const {error} = this.props;
        if (error) {
            return (
                <div className="alert alert-danger">
                    <span>{error}</span>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="mt-4 col-lg-6 col-md-8">
                    <Card>
                        <CardHeader tag="h4">Create new account</CardHeader>
                        <CardBody>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={this.onSubmit}
                                validationSchema={validationSchema}>
                                {
                                    (formik) => {
                                        const {errors, touched, isValid, dirty} = formik;
                                        return (
                                            <Form>
                                                {this.renderError()}
                                                <div className="form-group">
                                                    <Label for="name">Name</Label>
                                                    <Field
                                                        className={errors.name && touched.name ? 'form-control is-invalid' : 'form-control'}
                                                        name="name" id="name" placeholder="Your Name"/>
                                                    <ErrorMessage name="name" component="span"
                                                                  className="text-danger"/>
                                                </div>
                                                <div className="form-group">
                                                    <Label for="email">Email</Label>
                                                    <Field
                                                        className={errors.email && touched.email ? 'form-control is-invalid' : 'form-control'}
                                                        name="email" id="email" placeholder="someone@mail.com"/>
                                                    <ErrorMessage name="email" component="span"
                                                                  className="text-danger"/>
                                                </div>
                                                <div className="form-group">
                                                    <Label for="password">Password</Label>
                                                    <Field
                                                        className={errors.password && touched.password ? 'form-control is-invalid' : 'form-control'}
                                                        type="password" name="password" id="password"
                                                        placeholder="Your Password"/>
                                                    <ErrorMessage name="password" component="span"
                                                                  className="text-danger"/>
                                                </div>
                                                <hr/>
                                                <div className="form-group">
                                                    <button className="btn btn-primary btn-block" type="submit"
                                                            disabled={!(dirty && isValid)}>Sign Up
                                                    </button>
                                                </div>
                                            </Form>
                                        );
                                    }
                                }
                            </Formik>
                            <Link to="/login">Have an account? Login now</Link>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({signup}) => {
    return {
        attempting: signup.attempting,
        created: signup.created,
        error: signup.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (values) => dispatch(signup(values))
    }
}
const Signup = connect(mapStateToProps, mapDispatchToProps)(SignupPage);
export {Signup};