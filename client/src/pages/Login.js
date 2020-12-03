import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Label} from 'reactstrap';
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";

const initialValues = {email: '', password: ''};
const onSubmit = values =>{
    console.log('formValues', values);
}
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address!').required('Email address is required!'),
    password: Yup.string().required('Password is required!')
});

class Login extends Component {
    render() {
        return (
            <div className="row justify-content-center">
                <div className="mt-4 col-lg-6 col-md-8">
                    <Card>
                        <CardHeader tag="h4">Login to your account</CardHeader>
                        <CardBody>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onSubmit}
                                validationSchema={validationSchema}>
                                {
                                    (formik) =>{
                                        const {errors, touched, isValid, dirty} = formik;
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
                                                <hr/>
                                                <div className="form-group">
                                                    <button className="btn btn-primary btn-block" type="submit" disabled={!(dirty && isValid)}>Sign In</button>
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

export {Login};