import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import postReducer from './reducers/postReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
