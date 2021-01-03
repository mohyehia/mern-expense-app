import React from 'react';
import {Badge} from "reactstrap";
import moment from "moment";
import {Link} from "react-router-dom";

const ExpenseItem = ({item, deleteExpense}) => {
    return (
        <tr>
            <td><Badge color='dark'>{item.amount}</Badge></td>
            <td>{item.description}</td>
            <td className='text-muted'>{moment(item.created).format('LL')}</td>
            <td><Link to={{
                pathname: '/edit',
                state: {item}
            }} className='btn btn-sm btn-success'><i className='fa fa-edit'/></Link></td>
            <td><button className='btn btn-sm btn-danger' onClick={deleteExpense} data-id={item.id}><i className='fa fa-trash'/></button></td>
        </tr>
    );
}

export {ExpenseItem};