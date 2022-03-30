import {
  Box,
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { Fragment } from 'react';
import { City } from '../../../shared/model';

const useStyles = makeStyles((theme) => ({
  table: {},
  edit: {
    marginRight: theme.spacing(1),
  },
}));

export interface CityTableProps {
  cityList: City[];
}

export default function CityTable({ cityList }: CityTableProps) {
  const classes = useStyles();
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>City Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cityList.map((city) => (
              <TableRow key={city.code}>
                <TableCell>{city.code}</TableCell>
                <TableCell>{city.name}</TableCell>

                <TableCell align="right">
                  <Button size="small" className={classes.edit} color="primary">
                    Edit
                  </Button>
                  <Button size="small" color="secondary">
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
