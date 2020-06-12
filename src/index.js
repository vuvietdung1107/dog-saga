import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import {Provider} from "react-redux";

import {reducer } from "./redux";
import {watcherSaga} from "./sagas";
// import {register} from "./serviceWorker";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// create a redux store with our reducer above and middleware
let store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

//run the saga
sagaMiddleware.run(watcherSaga);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);

