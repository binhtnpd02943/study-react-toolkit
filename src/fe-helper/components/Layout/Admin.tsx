import { Box, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import CityFeature from '../../../modules/city/router';
import ScreenDashboard from '../../../modules/dashboard/screen/ScreenDashboard';
import StudentFeature from '../../../modules/student/router';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '260px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,

    minHeight: '100vh',
  },

  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: 'main',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3),
  },
}));

const AdminLayout: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classes.main}>
        <Switch>
          <Route path="/admin/dashboard">
            <ScreenDashboard />
          </Route>

          <Route path="/admin/students">
            <StudentFeature />
          </Route>

          <Route path="/admin/cities">
            <CityFeature />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
};
export default AdminLayout;
