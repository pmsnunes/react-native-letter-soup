import * as types from '../actions/types';

const initialState = {
    counter: 0,
}

const Soup = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case types.SOUP_INCREMENT:            
            newState.counter = state.counter + 1;
            return newState;
        case types.SOUP_DECREMENT: 
            newState.counter = state.counter -1;
            return newState;
        case types.SOUP_DECREMENT_VALUE:
            newState.counter = newState.counter - action.value;
            return newState;
        default:
            return state
    }
};

export default Soup;