import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../../../fe-helper/core/store/types';
import { fetchCityListRequest } from '../action';
import CityTable from '../components/CityTable';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function CityList() {
  const match = useRouteMatch();
  const classes = useStyles();
  const dispatch = useDispatch();

  const cityState: any = useSelector<ApplicationState | null>((state) => state?.city);
 
  useEffect(() => {
    dispatch(fetchCityListRequest());
  }, [dispatch]);

  const handlerPageChange = (e: any, page: number) => {};
  return (
    <Box className={classes.root}>
      {/* Loading*/}
      {cityState.loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleContainer}>
        <Typography variant="h4">City</Typography>
        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new City
          </Button>
        </Link>
      </Box>

      {/* Student List All */}
      <CityTable cityList={cityState.list} />

      {/* Pagination */}
      <Box my={2} className={classes.pagination}>
        <Pagination
          color="primary"
          count={Math.ceil(cityState.pagination._totalRows / cityState.pagination._limit)}
          page={cityState.pagination._page}
          onChange={handlerPageChange}
        />
      </Box>
    </Box>
  );
}
