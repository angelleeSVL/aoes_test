import { handle } from 'redux-pack';
import { onStart, onSuccess, onFailure } from './stateTransitions';
import { AV } from '../store/AsyncValue';
import { Map } from "immutable"


export const simplePackHandlers = payload => 
({
  start: onStart(payload),
  success: onSuccess(payload),
  failure: onFailure(payload),
})

export const routeReducerSimple = <R>(route: R) => (state = AV.init(), action) => {
  if (action.type !== route) { 
    return state;
  }
  return handle(state, action, simplePackHandlers(action.payload))
}

export const routeMapReducer = <R>(route: R, keyF: (params: any) => any) =>
  (state: Map<any, any>, action) => {
  
  const {type, payload, meta} = action;

  if (state === undefined) { 
    return Map();
  }
  if (type !== route) { 
    return state;
  }
  
  const handlers = {
    start: oldState => oldState.update(keyF(meta.parameters), onStart(payload)),
    success: oldState => oldState.update(keyF(meta.parameters), onSuccess(payload)),
    failure: oldState => oldState.update(keyF(meta.parameters), onFailure(payload)),
  }

  return handle(state, action, handlers)
}
