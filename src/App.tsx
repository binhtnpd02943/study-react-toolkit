import React from 'react';
import { Route, Router, Switch, useHistory } from 'react-router-dom';
import PrivateRoute from './fe-helper/components/Common/PrivateRoute';
import AdminLayout from './fe-helper/components/Layout/Admin';
import LoginPage from './modules/auth/screen/LoginPage';

function App() {
  const history = useHistory();

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <PrivateRoute path="/admin">
            <AdminLayout />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
