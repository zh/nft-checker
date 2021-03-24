import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Pages from './Pages';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Pages.Home} />
      <Route path="/view/:txid" component={Pages.Viewer} />
    </Switch>
  );
};

export default Routes;
