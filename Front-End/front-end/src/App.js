import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Navbar} from "react-bootstrap";
import Trending from "./components/pages/Trending";
import FindPeople from "./components/pages/FindPeople";
import Groups from "./components/pages/Groups";
import MyPage from "./components/pages/MyPage";
import Home from "./components/pages/Home";

function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState()



    return (
      <Router>

          <div className="App">
              <Header />
          </div>

          <Route path='/home' component={Home}/>
          <Route path='/trending' component={Trending} />
          <Route path='/findpeople' component={FindPeople} />
          <Route path='/groups' component={Groups}/>

          <Route path='/private' component={MyPage}/>
      </Router>
    );
}

export default App;
