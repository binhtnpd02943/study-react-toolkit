import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { ChangeEvent, useRef } from 'react';
import { City, ListParams } from '../../../shared/model';

export interface StudentFilterProps {
  filter: ListParams;
  cityList: City[];
  onChange?: (newFilter: ListParams) => void;
  onSearChange?: (newFilter: ListParams) => void;
}

export default function StudentFilter({
  filter,
  cityList,
  onChange,
  onSearChange,
}: StudentFilterProps) {
  const searchRef = useRef<HTMLInputElement>();

  const handlerSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearChange) return;

    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };
    onSearChange(newFilter);
  };

  const handlerCityChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    };
    onChange(newFilter);
  };

  const handlerSortChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;

    const value = e.target.value;
    const [_sort, _order] = (value as string).split('.');

    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };
    onChange(newFilter);
  };

  const handlerClearFilter = () => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    };
    onChange(newFilter);

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Search Student Name */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Search by name"
              endAdornment={<Search />}
              defaultValue={filter.name_like}
              onChange={handlerSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>

        {/* Filter */}
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              labelId="filterByCity"
              id="demo-simple-select-outlined"
              value={filter.city || ''}
              onChange={handlerCityChange}
              label="Filter by city"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>

              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Sort */}
        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByCity">Sort</InputLabel>
            <Select
              labelId="filterByCity"
              id="demo-simple-select-outlined"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handlerSortChange}
              label="Sort"
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>

              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Clear Filter */}
        <Grid item xs={12} md={6} lg={1}>
          <Button variant="outlined" color="primary" fullWidth onClick={handlerClearFilter}>
            {' '}
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
