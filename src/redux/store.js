import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import languageReducer from "./reducer";
import ScoreReducer from './Score/ScoreReducer';
import SubjectReducer from './Subject/subjectReducer';

const allReducer = combineReducers({
    languageReducer,
    ScoreReducer,
    SubjectReducer,
});

const middleware = [thunk]; // add any additional middleware you want to use here

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(allReducer, enhancer);

export default store;