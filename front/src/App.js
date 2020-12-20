import React from "react";
import './App.css';
import Login from "./components/login/login";
import Register from "./components/login/register";
import Welcome from "./components/welcome/welcome";
import Home from "./components/welcome/home";
import Channel from "./components/welcome/channel";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
    return (
      <Router>
      <div className="App">
          <div className="container d-flex align-items-center flex-column">
            <Switch>
              <Route path="/" exact={true}>
                <Welcome />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path='/home'>
                <Home />
              </Route>
              <Route path='/channel'>
                <Channel />
              </Route>
            </Switch>
          </div>
      </div>
      </Router>
  );
}

export default App;
