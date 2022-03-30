import AppReducer, { AppInitialState } from '../../../store/appReducer';
import { combineReducers } from 'redux';
import { ApplicationState } from './types';

export const AppDataState: ApplicationState = {
  ...AppInitialState,
};

export default function buildRootReducer() {
  return combineReducers({
    ...AppReducer,
  });
}
