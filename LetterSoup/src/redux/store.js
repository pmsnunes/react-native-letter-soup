import { createStore } from 'redux';
import reducer from './reducers/rootReducer';

function configureStore(initialState) {
  return createStore(reducer, initialState);
}

export default configureStore({});
