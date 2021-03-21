import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Pages from './Pages';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Pages.Home} />
    </Switch>
  );
};

export default Routes;
