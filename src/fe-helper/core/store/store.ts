import { Action,configureStore,ThunkAction } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import { history } from '../../../shared/helper/history';
import rootReducer, { AppDataState } from '../../core/store/rootReducer';
import { ApplicationState } from '../../core/store/types';
import rootSaga from './sagas';

function configureAppStore(initialState: ApplicationState) {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  const { run: runSaga } = sagaMiddleware;

  // // sagaMiddleware: Makes redux saga works
  // const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer: rootReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    reducer: rootReducer(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        sagaMiddleware,
        routerMiddleware(history)
      ),
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  });

  sagaMiddleware.run(rootSaga);
  return store;
}

export { configureAppStore };
export const store = configureAppStore(AppDataState);