import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Signin from './components/Signin';
import Ticketsystem from './components/ticketsystem';

const generateClassName = createGenerateClassName({
  productionPrefix: 'Login',
});

const App = () => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Signin />
            </Route>
            <Route path="/Login">
              <Signin />
            </Route>
            <Route path="/Ticketbook">
              <Ticketsystem />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};

export default App;
