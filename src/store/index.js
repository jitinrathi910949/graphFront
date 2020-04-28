import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducers } from "./reducers/index";
import  rootSaga  from "./sagas/index";
import freeze from "redux-freeze";
import { createBrowserHistory } from 'history';
import { routerMiddleware } from "react-router-redux";

let middlewares = [];

const history = createBrowserHistory();

middlewares.push(routerMiddleware(history));

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(freeze);
  }

  let middleware = applyMiddleware(...middlewares);

  if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    middleware = compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const store = createStore(rootReducers, middleware);

  sagaMiddleware.run(rootSaga);
  
  export { store, history };