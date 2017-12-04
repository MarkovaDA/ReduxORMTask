import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createReducer } from 'redux-orm';
import { schema } from './schema/Schema';
import { bootstrapInitialState } from './bootstrap';
import { rootReducer } from './reducers/rootReducer';
import 'semantic-ui-css/semantic.min.css';

import './styles/AppStyle.css';

const reducer = combineReducers({
  /*orm: schema.reducer(),*/
  orm: createReducer(schema),
  app: rootReducer
});

const createStoreWithMiddleWare = applyMiddleware(createLogger)(createStore);

const store = createStoreWithMiddleWare(reducer, bootstrapInitialState(schema));

/*let store = createStore(
  reducer,
  applyMiddleware(thunk)
);*/

ReactDOM.render(
  (<Provider store = {store}>
    <App />
  </Provider>),
  document.getElementById('root')
);


