import React, {useState, useEffect} from 'react'
import Dashboard from './Dashboard'
import Methodology from './components/Methodology'
import Single from './components/Single'
import Pdf from "./components/research.pdf";
import './styles/Card.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

const App = () => {
    const [single, setSingle] = useState('')
    const [alert, setAlert] = useState(false)

    const handleSingle = e => {
        setSingle(e.target.value);
        console.log(e.target.value);
    }

    const renderAlert = () => {
        if (alert) {
        return (
            <div class="alert alert-warning" role="alert">
                Please press the "Submit" button instead of enter when searching for coins
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
        }
        return (
            <span></span>
        )
    }

    const handleSubmit = e => {
        e.preventDefault();
        setAlert(true)
    }

    return (
    <Router>
      <div>

    <nav className="navbar sticky-top navbar-expand-lg navbar-light" id="nav">
        <a className="navbar-brand">CECI</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
            <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/methodology">Methodology</Link>
            </li>
            <li className="nav-item active">
                <a className="nav-link" href = {Pdf} target = "_blank">Research Paper (pdf)</a>
                <Link className="nav-link" to="/"></Link>
            </li>
            </ul>
            <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
                <input className="form-control mr-sm-2" type="search" value={single} onChange={handleSingle} placeholder="Search by Code" aria-label="Search"/>
                <Link to={"/coins/" + single} className="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search</Link>
            </form>
        </div>
    </nav>
        {renderAlert()}
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
            <Route path="/methodology">
                <Methodology/>
            </Route>
            <Route path="/coins">
                <Coins />
            </Route>
            <Route path="/">
                <Dashboard />
            </Route>
        </Switch>
      </div>
    </Router>
  );
}


function Coins() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:coinId`}>
          <Coin />
        </Route>
        <Route path={match.path}>
          <h3>Please Enter a Coin Code (e.g. BTC)</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Coin() {
  let { coinId } = useParams();
 
  return (
        <Single code={coinId} electricity={0.1}/>
  )
}

export default App