import React from 'react';
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";

const ProtectedRouteComponent  = ({isAuth, component: Component, ...rest}) => {
        return (
            <Route
                {...rest}
                render={props => isAuth ? <Component {...props}/> : <Redirect to='/login' /> }
            />
        );
}

const mapStateToProps = state =>{
    return {
        isAuth: state.auth.isAuth
    }
}

const ProtectedRoute = connect(mapStateToProps)(ProtectedRouteComponent);
export {ProtectedRoute};