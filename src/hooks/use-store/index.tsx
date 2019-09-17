/**
 * Based on:
 * https://medium.com/front-end-weekly/
 * react-hooks-tutorial-for-pure-usereducer-usecontext-for-global-state-like-redux-and-comparison-dd3da5053624
 */
import * as React from 'react';
import { Action, initialState, reducer } from './state';

const dispatchCtx = React.createContext(((action: Action) => 0) as React.Dispatch<Action>);
const stateCtx = React.createContext(initialState);

export function StoreProvider(props: { children?: React.ReactNode; }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <dispatchCtx.Provider value={dispatch}>
      <stateCtx.Provider value={state}>
        {props.children}
      </stateCtx.Provider>
    </dispatchCtx.Provider>
  );
}

export function useStoreDispatch() {
  return React.useContext(dispatchCtx);
}

export function useStore<K extends keyof typeof initialState>(property: K) {
  const state = React.useContext(stateCtx);
  return state[property]; // only one depth selector for comparison
}
