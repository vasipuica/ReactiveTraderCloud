import * as _ from 'lodash'
import { createAction } from 'redux-actions';

export enum ACTION_TYPES {
  BLOTTER_SERVICE = '@ReactiveTraderCloud/BLOTTER_SERVICE'
}

export const fetchBlotter = createAction(ACTION_TYPES.BLOTTER_SERVICE)

export const blotterServiceEpic = blotterService$ => action$ => {
  return blotterService$.getTradesStream()
    .map(fetchBlotter);
}

export const blotterServiceReducer = (state: any = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.BLOTTER_SERVICE:
      if (_.isEmpty(state)) {
        return action.payload;
      }
      const _trades = [ ...state, ...action.payload ]
      return Object.assign({}, state, { _trades })

    default:
      return state
  }
}

