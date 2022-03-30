import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import CityList from './screen/CityList';

export default function CityFeature() {
  const match = useRouteMatch();

  return (
    <Box>
      <Switch>
        <Route path={match.path} exact>
          <CityList />
        </Route>
      </Switch>
    </Box>
  );
}
