import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Pages from './Pages';

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Pages.Home} />
        <Route path="/view/:txid" component={Pages.Viewer} />
      </Switch>
    </HashRouter>
  );
};

export default Routes;
