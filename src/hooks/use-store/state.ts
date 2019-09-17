export const initialState: {
  isConnected: boolean
} = {
  isConnected: false,
};

export type Action =
  | { type: 'connected' }
  | { type: 'disconnected' };

export function reducer(state: typeof initialState, action: Action): typeof initialState {
  const newState = { ...state };
  switch (action.type) {
    case 'connected':
      newState.isConnected = true;
      break;
    case 'disconnected':
      newState.isConnected = false;
      break;
    default:
      break;
  }

  return JSON.stringify(state) === JSON.stringify(newState) ? state : newState;
}
