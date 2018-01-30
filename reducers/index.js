import { combineReducers } from 'redux';
import StatesReducers from './states';

const allReducers = combineReducers ({
    states: StatesReducers
});

export default allReducers;
