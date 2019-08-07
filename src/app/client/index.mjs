
import {render} from 'react-dom';
import {compose} from 'redux';
import log from 'logger';
import {renderApp, getStore} from '../common';
import ymaps from './ymaps';
import api from './api';
import {initMetrika} from './metrika';

const {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: composeEnhancers = compose,
    __INITIAL_STATE__: initialState = {},
} = window;

const appRootDomNode = document.getElementById('app');

const store = getStore(initialState, api, composeEnhancers);

ymaps(store);

initMetrika(store);

render(renderApp(store), appRootDomNode);
