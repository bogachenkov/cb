import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Developers from './Developers';
import DevelopersHandle from './DevelopersHandle';
import NotFound from '../NotFound/NotFound';

class DevelopersRouter extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/developers" component={Developers} />
        <Route exact path="/developers/:username" component={DevelopersHandle} />
      <Route component={NotFound} />
      </Switch>
    );
  }

}

export default DevelopersRouter
