import React from 'react'
import Dashboard from './Dashboard'
import Methodology from './components/Methodology'
import Pdf from "./components/research.pdf";
import './styles/Card.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
    return (
    <Router>
      <div>

    <nav className="navbar sticky-top navbar-expand-lg navbar-light" id="nav">
        <a class="navbar-brand">CECI</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
            <li class="nav-item active">
                <Link class="nav-link" to="/">Home</Link>
            </li>
            <li class="nav-item active">
                <Link class="nav-link" to="/methodology">Methodology</Link>
            </li>
            <li class="nav-item active">
                <a class="nav-link" href = {Pdf} target = "_blank">Research Paper (pdf)</a>
                <Link class="nav-link" to="/"></Link>
            </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search by Code" aria-label="Search"/>
                <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/methodology">
            <Methodology/>
          </Route>
        <Route path="/Research">

          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App