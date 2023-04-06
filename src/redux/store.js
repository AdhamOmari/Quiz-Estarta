import { combineReducers, createStore } from 'redux';
import languageReducer from "./reducer";
import ScoreReducer from './Score/ScoreReducer'

const allReducer = combineReducers({
    languageReducer, ScoreReducer
})
const store = createStore(allReducer);

export default store;