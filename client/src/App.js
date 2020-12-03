import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Home, Login, Signup} from "./pages";
import {NavBar} from "./components";

function App() {
  return (
      <BrowserRouter>
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
      </BrowserRouter>
  );
}

export default App;
