import { Store, Action } from 'fluxx';
import update from 'immupdate';

import { incrementBlue, incrementRed } from './action';

Store.log = true;

interface State {
  blue: {
    count: number,
    red: {
      count: number
    }
  }
};

const initialState = {
  blue: { count: 0, red: { count: 0 } }
};

function updateStore<P>(state: State, action: Action<P>): State {

  if (action.is(incrementBlue)) {
    return update(state, { blue: { count: c => c + 1 } });
  }

  if (action.is(incrementRed)) {
    const { value } = action;
    return update(state, { blue: { red: { count: c => c + action.value } } });
  }

  return state;
}

export default Store(initialState, updateStore);
