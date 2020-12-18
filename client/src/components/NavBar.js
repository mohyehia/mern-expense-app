import {NavLink} from "react-router-dom";
import React, {Fragment, useState} from "react";
import {connect} from "react-redux";
import {ButtonDropdown, Dropdown, DropdownMenu, DropdownToggle} from "reactstrap";
import {logout} from "../actions";

function NavBarComponent(props){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const renderLoginOrLogout = () =>{
        const {isAuth, logOut, profile} = props;
        if(isAuth){
            return (
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret color="link" size="sm">
                        Welcome, {profile.name}
                    </DropdownToggle>
                    <DropdownMenu>
                        <ButtonDropdown onClick={() => logOut()} style={{cursor: 'pointer'}}>Logout</ButtonDropdown>
                    </DropdownMenu>
                </Dropdown>
            );
        }else{
            return (
                <Fragment>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                    </li>
                </Fragment>
            );
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/">MERN Expense</NavLink>
                    </li>
                    {renderLoginOrLogout()}
                </ul>
            </div>
        </nav>
    );
}

const mapStateToProps = state =>{
    return {
        isAuth: state.auth.isAuth,
        profile: state.auth.profile
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        logOut: () => dispatch(logout())
    }
}
const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);
export {NavBar};