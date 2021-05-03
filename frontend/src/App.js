import React from 'react';
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import AboutUs from "./pages/AboutUs";

import Profiles from './components/Profiles';
import './App.css';
//import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/home' exact component={Home} />
        <Route path="/profiles" render={props => <Profiles {...props} />} />
        <Route path="/analysis/:title" render={props => <Analysis {...props} />}/>
        <Route path='/aboutus' exact component={AboutUs} />

        {/* Redirect */}
        <Route exact path="/"> <Redirect to="/profile" /></Route>
          
        </Switch>
      </Router>
    </>
  );
}

export default App;
