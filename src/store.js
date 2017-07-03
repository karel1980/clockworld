import { createStore } from 'redux';
import clockWorldReducer from './reducer';
import {nextQuestion} from "./actions/clock.actions";

const store = createStore(clockWorldReducer);

store.dispatch(nextQuestion());

export default store;