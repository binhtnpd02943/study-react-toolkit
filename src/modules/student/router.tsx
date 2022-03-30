import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import { fetchCityListRequest } from '../city/action';
import AddEditStudent from './screen/form/AddEditStudent';
import StudentList from './screen/list/StudentList';

export default function StudentFeature() {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCityListRequest());
  }, [dispatch]);

  return (
    <Box>
      <Switch>
        <Route path={match.path} exact>
          <StudentList />
        </Route>

        <Route path={`${match.path}/add`}>
          <AddEditStudent />
        </Route>

        <Route path={`${match.path}/:studentId`}>
          <AddEditStudent />
        </Route>
      </Switch>
    </Box>
  );
}
