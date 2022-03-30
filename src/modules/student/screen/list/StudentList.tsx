import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApplicationState } from '../../../../fe-helper/core/store/types';
import { ListParams, Student } from '../../../../shared/model';
import { selectCityMap } from '../../../city/reducer';
import StudentFilter from '../../component/StudentFilter';
import StudentTable from '../../component/StudentTable';
import {
  deleteStudentRequest,
  fetchStudentListRequest,
  setFilter,
  setFilterWithDebounce,
} from '../../screen/list/action';

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

export default function StudentList() {
  const match = useRouteMatch();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const studentState: any = useSelector<ApplicationState | null>((state) => state?.student);
  const cityState: any = useSelector<ApplicationState | null>((state) => state?.city);
  const cityMap = useSelector(selectCityMap);

  const { loading, filter, list, pagination } = studentState;

  useEffect(() => {
    dispatch(fetchStudentListRequest(filter));
  }, [dispatch, filter]);

  const handlerPageChange = (e: any, page: number) => {
    dispatch(
      setFilter({
        ...filter,
        _page: page,
      })
    );
  };
  const handlerFilterChange = (newFilter: ListParams) => {
    dispatch(setFilter(newFilter));
  };
  const handlerSearchChange = (newFilter: ListParams) => {
    console.log('search', newFilter);
    dispatch(setFilterWithDebounce(newFilter));
  };

  const handlerRemoveStudent = (student: Student) => {
    dispatch(deleteStudentRequest({ id: student?.id || '' }));

    toast.success('Remove student successfully!');
  };

  const handlerEditStudent = async (student: Student) => {
    history.push(`${match.url}/${student.id}`);
  };

  return (
    <Box className={classes.root}>
      {/* Loading*/}
      {loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleContainer}>
        <Typography variant="h4">Student</Typography>
        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>

      {/* Filter */}
      <Box mb={3}>
        <StudentFilter
          filter={filter}
          cityList={cityState.list}
          onChange={handlerFilterChange}
          onSearChange={handlerSearchChange}
        />
      </Box>

      {/* Student List All */}
      <StudentTable
        studentList={list}
        cityMap={cityMap}
        onEdit={handlerEditStudent}
        onRemove={handlerRemoveStudent}
      />

      {/* Pagination */}
      <Box my={2} className={classes.pagination}>
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination._page}
          onChange={handlerPageChange}
        />
      </Box>
    </Box>
  );
}
