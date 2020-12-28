import React from 'react';
import {Badge} from "reactstrap";
import moment from "moment";

const ExpenseItem = ({item}) => {
    return (
        <tr>
            <td><Badge color='dark'>{item.amount}</Badge></td>
            <td>{item.description}</td>
            <td className='text-muted'>{moment(item.created).format('LL')}</td>
            <td><button className='btn btn-sm btn-success'><i className='fa fa-edit'/></button></td>
            <td><button className='btn btn-sm btn-danger'><i className='fa fa-trash'/></button></td>
        </tr>
    );
}

export {ExpenseItem};