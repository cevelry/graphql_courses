import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { JobBoard } from './JobBoard';


import {Cart} from './Cart'

export class App extends Component {
  constructor(props) {
    super(props);

  }



  render() {
    // const {loggedIn} = this.state;
    return (
      <Router ref={(router) => this.router = router}>
        <div>
          <section className="section">
            <div className="container">
              <Switch>
                <Route exact path="/cart" component={Cart} />
                <Route  path="/" component={JobBoard} />
                <Route exact path="/courses" component={JobBoard} />
                
              </Switch>
            </div>
          </section>
        </div>
      </Router>
    );
  }
}
