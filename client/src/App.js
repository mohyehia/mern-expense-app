import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Edit, Home, Login, NotFound, Signup} from "./pages";
import {NavBar, ProtectedRoute} from "./components";
import {Provider} from "react-redux";
import store from "./store";
import {checkAuthentication} from "./actions";

store.dispatch(checkAuthentication());

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div>
                    <NavBar/>
                    <div className="container">
                        <Switch>
                            <ProtectedRoute path="/" component={Home} exact/>
                            <ProtectedRoute path="/edit" component={Edit} exact/>
                            <Route path="/login" component={Login} exact/>
                            <Route path="/signup" component={Signup} exact/>
                            <Route path="/*" component={NotFound} exact/>
                        </Switch>
                    </div>
                </div>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
