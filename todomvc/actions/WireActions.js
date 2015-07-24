import * as types from '../constants/WireActions';

export function setState(state) {
    return {
        type: types.SET_STATE, state
    };
}