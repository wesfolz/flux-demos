import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import RouteOne from './RouteOne';
import RouteTwo from './RouteTwo';
import FluxCounter from './FluxCounter';
import AsyncCategories from './AsyncCategories';

class App extends Component {
  render() {
    return (
      <main className="container">
        <header>
          <h1>Flux Demos Tuesday</h1>
        </header>
        <Router>
          <div className="row">
            <div className="col-3">
              <ul>
                <li><Link to="/route-one">Route One</Link></li>
                <li><Link to="/route-two">Route Two</Link></li>
                <li><Link to="/flux-counter">Flux Counter</Link></li>
                <li><Link to="/async-categories">Async Categories</Link></li>
                <li><Link to="/">Choose no route</Link></li>
              </ul>
            </div>
            <div className="col-1">&nbsp;</div>
            <div className="col">
              <Route path="/route-one" component={RouteOne}/>
              <Route path="/route-two" component={RouteTwo}/>
              <Route path="/" exact render={() => <h3>No Route chosen</h3>}/>
              <Route path="/flux-counter" component={FluxCounter} />
              <Route path="/async-categories" component={AsyncCategories} />
            </div>
          </div>
        </Router>
      </main>
    );
  }
}

export default App;
