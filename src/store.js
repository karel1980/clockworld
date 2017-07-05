import { createStore, applyMiddleware } from 'redux';
import clockWorldReducer from './reducer';
import {nextQuestion} from "./actions/clock.actions";
import reduxLogger from 'redux-logger';

const store = createStore(clockWorldReducer, applyMiddleware(reduxLogger));

store.dispatch(nextQuestion());

export default store;
