import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import AboutUs from "./pages/AboutUs";
import Profiles from './components/Profiles';
import Navbar from './components/Navbar'


function App() {
  return (
    <>
      <Navbar />
      <Router>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/home' exact component={Home} />
            <Route path="/profiles" render={props => <Profiles {...props} />} />
            <Route path="/analysis/:celebName" render={props => <Analysis {...props} />}/>
            
            {/* <Route path='/about' exact component={AboutUs} /> */}

            {/* Redirect */}
            <Route exact path="/"> <Redirect to="/profile" /></Route>

            {/* in case of no match */}
            {/* <Route path="*" element={<Nomatch />} /> */}
          </Switch>
      </Router>
    </>
  );
}

export default App;
