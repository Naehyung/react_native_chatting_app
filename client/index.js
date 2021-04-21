/**
 * @format
 */
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import React from 'react';
import { reducers } from './reducers';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import logger from 'redux-logger'


const store = createStore(reducers, compose(applyMiddleware(thunk)));

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Root);
