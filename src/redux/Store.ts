import {applyMiddleware, createStore} from 'redux'
import {rootEpic, rootReducer} from "./reducers/RootReducers";
import {createEpicMiddleware} from "redux-observable";

const epicMiddleware = createEpicMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);


export default store
