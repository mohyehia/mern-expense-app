import React, {Component} from 'react';
import {connect} from "react-redux";

const ProtectedRouteComponent  = () => {
        return (
            <div>
                Protected Route
            </div>
        );
}

const mapStatsToProps = state =>{
    return {
        isAuth: state.auth.isAuth
    }
}

const ProtectedRoute = connect()(ProtectedRouteComponent);
export {ProtectedRoute};