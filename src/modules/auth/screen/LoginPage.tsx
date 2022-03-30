import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ApplicationState } from '../../../fe-helper/core/store/types';
import { loginRequest, setIsLeave } from '../action';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },

  box: {
    padding: theme.spacing(3),
  },
}));

export default function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const state: any = useSelector<ApplicationState | null>((state) => state?.auth);

  const classes = useStyles();

  const handleLoginClick = () => {
    // TODO: Get username + pwd from login form
    dispatch(
      loginRequest({
        username: '',
        password: '',
      })
    );
  };

  // redirect to admin page
  useEffect(() => {
    if (state.isLeave) {
      dispatch(setIsLeave({ isLeave: false }));
      history.push('/admin/dashboard');
    }
  }, [state.isLeave]);

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>

        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            {state.logging && <CircularProgress size={20} color="secondary" />} &nbsp; Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
