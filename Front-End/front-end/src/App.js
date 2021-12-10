import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Navbar} from "react-bootstrap";
import Trending from "./components/pages/Trending";
import FindPeople from "./components/pages/FindPeople";
import Groups from "./components/pages/Groups";
import PrivatePage from "./components/pages/PrivatePage";
import Home from "./components/pages/Home";
import PublicPage from "./components/pages/PublicPage";

function App() {
    let privatePath = '/private/' + localStorage.getItem('username')

    return (
      <Router>

          <div className="App">
              <Header />
          </div>

          <Route path='/home' component={Home}/>
          <Route path='/trending' component={Trending} />
          <Route path='/findpeople' component={FindPeople} />
          <Route path='/groups' component={Groups}/>

          <Route path={privatePath} component={PrivatePage}/>
          <Route exact path={"/public/:id"} component={PublicPage}/>
      </Router>
    );
}

export default App;
