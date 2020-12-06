import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Label} from 'reactstrap';
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../actions";

const initialValues = {email: '', password: ''};
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address!').required('Email address is required!'),
    password: Yup.string().required('Password is required!')
});

class LoginPage extends Component {

    componentDidUpdate() {
        const {error, isAuth} = this.props;
        if(error && this.actions){
            this.actions.setSubmitting(false);
        }
        if(isAuth){
            // redirect user to home page if authenticated successfully
            this.props.history.push('/');
        }
    }

    onSubmit = (values, actions) =>{
        this.props.signIn(values);
        this.actions = actions;
    }

    renderError = () =>{
        const error = this.props.error;
        if(error){
            return(
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
                        <CardHeader tag="h4">Login to your account</CardHeader>
                        <CardBody>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={this.onSubmit}
                                validationSchema={validationSchema}>
                                {
                                    (formik) =>{
                                        const {errors, touched, isValid, dirty, isSubmitting} = formik;
                                        return (
                                            <Form>
                                                {this.renderError()}
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
                                                <hr/>
                                                <div className="form-group">
                                                    <button className="btn btn-primary btn-block" type="submit" disabled={!(dirty && isValid) || isSubmitting}>Sign In</button>
                                                </div>
                                            </Form>
                                        );
                                    }
                                }
                            </Formik>
                            <Link to="/signup">Don't have an account? Sign Up now</Link>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return {
        attempting: state.auth.attempting,
        error: state.auth.error,
        isAuth: state.auth.isAuth
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        signIn: (values) => dispatch(login(values))
    }
}
const Login = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export {Login};