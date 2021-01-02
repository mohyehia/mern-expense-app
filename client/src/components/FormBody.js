import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {ErrorMsg} from "./ErrorMessage";
import {Button, Label} from "reactstrap";
import moment from "moment";
import * as Yup from "yup";

const FormBody = ({btnText = 'Save Expense', onSubmit, expense = {}}) => {
    const {amount = '', description = '', created = undefined} = expense;
    const now = created ? moment(created).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
    const initialValues = {amount, description, created: now};
    const validationSchema = Yup.object({
        amount: Yup.number().min(1).integer().required('Please enter the expense amount!'),
        description: Yup.string().min(3),
        created: Yup.date().required('Please enter the expense date!')
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            {
                (formik) => {
                    const {errors, touched, isValid, dirty, isSubmitting} = formik;
                    return (
                        <Form>
                            <ErrorMsg/>
                            <div className="form-group">
                                <Label for="description">Description</Label>
                                <Field
                                    className={errors.description && touched.description ? 'form-control is-invalid' : 'form-control'}
                                    name="description" type="text" id="description"
                                    placeholder="Enter Expense Description"/>
                                <ErrorMessage name="description" component="span" className="text-danger"/>
                            </div>
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
                                <Button color="primary" type="submit"
                                        disabled={!(dirty && isValid) || isSubmitting}>{btnText}</Button>
                            </div>
                        </Form>
                    );
                }
            }
        </Formik>
    );
}

export {FormBody};