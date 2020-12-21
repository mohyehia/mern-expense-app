import React from 'react';
import {connect} from "react-redux";

const ErrorMessageComponent = (props) => {
    if(props.error){
        return (
            <div className="alert alert-danger">
                <span>{props.error}</span>
            </div>
        );
    }
    return <></>;
}
const mapStateToProps = (state) =>{
    return {
        error: state.errors.message
    }
}
const ErrorMsg = connect(mapStateToProps)(ErrorMessageComponent);
export {ErrorMsg};