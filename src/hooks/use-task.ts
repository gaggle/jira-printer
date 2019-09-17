// const task = useTask(
//   async () => {
//     await sleep(900);
//     return ({ foo: 'bar' });
//   },
//   []);
// useAsyncRun(task);

import { useEffect, useReducer } from 'react';

export function useTask<Result>(
  func: (abortController: AbortController) => Result,
  deps: readonly any[] | undefined,
) {
  const initialState = {
    abort: null,    // a method to abort this async function
    error: null,    // error of this async function
    pending: true,  // if this async function is not finished
    result: null,   // result of this async function
    start: null,    // a method to start this async function
    started: false, // if this async function is started
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(
    () => {
      let dispatchSafe = (action: Action<Result>) => dispatch(action);
      let abortController: AbortController | null = null;

      const start = async () => {
        if (abortController) {
          return;
        }
        abortController = new AbortController();
        dispatchSafe({ type: 'start' });
        try {
          const result = await func(abortController);
          dispatchSafe({ type: 'result', result });
        } catch (e) {
          dispatchSafe({ type: 'error', error: e });
        }
      };

      const abort = () => {
        if (abortController) {
          abortController.abort();
        }
      };

      dispatch({ type: 'ready', start, abort });
      return () => {
        dispatchSafe = () => null; // avoid to dispatch after stopped
        dispatch({ type: 'init', init: initialState });
      };
    },
    deps,
  );
  return state;
}

export function useAsyncRun<Result>(asyncTask: Task<Result>) {
  const start = asyncTask && asyncTask.start;
  const abort = asyncTask && asyncTask.abort;
  useEffect(
    () => {
      if (start) {
        start();
      }
      return () => {
        if (abort) {
          abort();
        }
      };
    },
    [start]);
}

type Action<Result> =
  | { type: 'init', init: Task<Result> }
  | { type: 'ready', start: Func, abort: Func }
  | { type: 'start' }
  | { type: 'result', result: Result }
  | { type: 'error', error: null }
  ;

type Func = (() => void) | null;

interface Task<Result> {
  abort: Func;           // a method to abort this async function
  error: null;           // error of this async function
  pending: boolean;      // if this async function is not finished
  result: Result | null; // result of this async function
  start: Func;           // a method to start this async function
  started: boolean;      // if this async function is started
}

function reducer<Result>(task: Task<Result>, action: Action<Result>): Task<Result> {
  switch (action.type) {
    case 'init':
      return action.init;
    case 'ready':
      return {
        ...task,
        abort: action.abort,
        start: action.start,
      };
    case 'start':
      return {
        ...task,
        started: true,
      };
    case 'result':
      return {
        ...task,
        pending: false,
        result: action.result,
      };
    case 'error':
      return {
        ...task,
        error: action.error,
        pending: false,
      };
    default:
      throw new Error(`unexpected action type: ${JSON.stringify(task)}`);
  }
}
