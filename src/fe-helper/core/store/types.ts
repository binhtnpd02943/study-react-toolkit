//import { CoreState } from '@/fe-helper/modules/types';
import { Action as ReduxAction } from 'redux';

export type ApplicationState = import('../../../store/types').default;

export type Action = ReduxAction;
export interface TypedAction<T> extends Action {
  payload: T;
}

export interface ErrorAction extends Action {
  payload: { error: Error };
}

export type ActionHandlers<T, P> = {
  [key: string]: (draft: T, payload: P) => any;
};
