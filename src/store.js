import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk  from 'redux-thunk';
import rootReducer from './reducers';

function _getMiddleware() {
  const middleware = [
    ReduxThunk
  ];

  return applyMiddleware(...middleware);
}

export default function configureStore(initialState) {
  const store = createStore(
		rootReducer, initialState,
		compose(_getMiddleware())
	);

  return store;
}
