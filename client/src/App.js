import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Home, Login, Signup} from "./pages";
import {NavBar} from "./components";
import {Provider} from "react-redux";
import store from "./store";

function App() {
  return (
      <BrowserRouter>
          <Provider store={store}>
              <div>
                  <NavBar />
                  <div className="container">
                      <Switch>
                          <Route path="/" component={Home} exact />
                          <Route path="/login" component={Login} exact />
                          <Route path="/signup" component={Signup} exact />
                      </Switch>
                  </div>
              </div>
          </Provider>
      </BrowserRouter>
  );
}

export default App;
